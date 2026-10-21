import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, CycleLog } from '../types';
import * as storage from '../storage/storage';

interface AppContextType {
  user: User | null;
  logs: CycleLog[];
  loading: boolean;
  setUser: (user: User) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  addLog: (log: CycleLog) => Promise<void>;
  deleteAllData: () => Promise<void>;
  exportData: () => Promise<string>;
  reload: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [logs, setLogs] = useState<CycleLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    await storage.migrateToSecureStorage();
    const [savedUser, savedLogs] = await Promise.all([
      storage.getUser(),
      storage.getLogs(),
    ]);
    setUserState(savedUser);
    setLogs(savedLogs);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setUser = async (u: User) => {
    await storage.saveUser(u);
    setUserState(u);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    await storage.saveUser(updated);
    setUserState(updated);
  };

  const addLog = async (log: CycleLog) => {
    const updated = await storage.addLog(log);
    setLogs(updated);
  };

  const deleteAllData = async () => {
    await storage.deleteAllData();
    setUserState(null);
    setLogs([]);
  };

  const exportData = async () => {
    return storage.exportAllData();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        logs,
        loading,
        setUser,
        updateUser,
        addLog,
        deleteAllData,
        exportData,
        reload: loadData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
