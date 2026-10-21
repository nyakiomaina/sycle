import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { User, CycleLog } from '../types';

const KEYS = {
  USER: 'cycle_user',
  LOGS: '@cycle_logs',
} as const;

const OLD_KEYS = {
  USER: '@cycle_user',
  WORKOUT_LOGS: '@cycle_workout_logs',
  MEAL_LOGS: '@cycle_meal_logs',
} as const;

export async function migrateToSecureStorage(): Promise<void> {
  const existingUser = await AsyncStorage.getItem(OLD_KEYS.USER);
  if (existingUser) {
    await SecureStore.setItemAsync(KEYS.USER, existingUser);
    await AsyncStorage.removeItem(OLD_KEYS.USER);
  }
  await AsyncStorage.removeItem(OLD_KEYS.WORKOUT_LOGS);
  await AsyncStorage.removeItem(OLD_KEYS.MEAL_LOGS);
}

export async function saveUser(user: User): Promise<void> {
  await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
}

export async function getUser(): Promise<User | null> {
  const data = await SecureStore.getItemAsync(KEYS.USER);
  return data ? JSON.parse(data) : null;
}

export async function saveLogs(logs: CycleLog[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
}

export async function getLogs(): Promise<CycleLog[]> {
  const data = await AsyncStorage.getItem(KEYS.LOGS);
  return data ? JSON.parse(data) : [];
}

export async function addLog(log: CycleLog): Promise<CycleLog[]> {
  const logs = await getLogs();
  const existingIndex = logs.findIndex((l) => l.date === log.date);
  if (existingIndex >= 0) {
    logs[existingIndex] = log;
  } else {
    logs.push(log);
  }
  await saveLogs(logs);
  return logs;
}

export async function getLogForDate(date: string): Promise<CycleLog | undefined> {
  const logs = await getLogs();
  return logs.find((l) => l.date === date);
}

export async function exportAllData(): Promise<string> {
  const [user, logs] = await Promise.all([getUser(), getLogs()]);
  return JSON.stringify(
    { user, logs, exportedAt: new Date().toISOString() },
    null,
    2
  );
}

export async function deleteAllData(): Promise<void> {
  await SecureStore.deleteItemAsync(KEYS.USER);
  await AsyncStorage.removeItem(KEYS.LOGS);
}
