import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { MOOD_OPTIONS, SYMPTOM_OPTIONS } from '../data/phaseContent';
import { getLogForDate } from '../storage/storage';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import type { FlowLevel, CycleLog } from '../types';

const FLOW_OPTIONS: { value: FlowLevel; label: string; emoji: string }[] = [
  { value: 'none', label: 'None', emoji: '○' },
  { value: 'light', label: 'Light', emoji: '◔' },
  { value: 'medium', label: 'Medium', emoji: '◑' },
  { value: 'heavy', label: 'Heavy', emoji: '●' },
];

export default function LogScreen() {
  const { addLog } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');

  const [flow, setFlow] = useState<FlowLevel | undefined>();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getLogForDate(today).then((existing) => {
      if (existing) {
        setFlow(existing.flow);
        setSelectedMoods(existing.mood || []);
        setSelectedSymptoms(existing.symptoms || []);
        setNote(existing.note || '');
      }
    });
  }, [today]);

  const toggleItem = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
    setSaved(false);
  };

  const handleSave = async () => {
    const log: CycleLog = {
      id: today,
      date: today,
      flow,
      mood: selectedMoods.length > 0 ? selectedMoods : undefined,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : undefined,
      note: note.trim() || undefined,
    };
    await addLog(log);
    setSaved(true);
    Alert.alert('Saved ✨', 'Your log for today has been saved.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Log your day</Text>
        <Text style={styles.date}>{format(new Date(), 'EEEE, MMMM d')}</Text>

        <Text style={styles.sectionTitle}>FLOW</Text>
        <View style={styles.flowRow}>
          {FLOW_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.flowChip, flow === opt.value && styles.flowChipActive]}
              onPress={() => {
                setFlow(opt.value);
                setSaved(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.flowEmoji, flow === opt.value && { color: COLORS.primary }]}>
                {opt.emoji}
              </Text>
              <Text style={[styles.flowLabel, flow === opt.value && styles.flowLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>MOOD</Text>
        <View style={styles.chipContainer}>
          {MOOD_OPTIONS.map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[styles.chip, selectedMoods.includes(mood) && styles.chipActive]}
              onPress={() => toggleItem(mood, selectedMoods, setSelectedMoods)}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.chipText, selectedMoods.includes(mood) && styles.chipTextActive]}
              >
                {mood}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>SYMPTOMS</Text>
        <View style={styles.chipContainer}>
          {SYMPTOM_OPTIONS.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              style={[styles.chip, selectedSymptoms.includes(symptom) && styles.chipActive]}
              onPress={() => toggleItem(symptom, selectedSymptoms, setSelectedSymptoms)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedSymptoms.includes(symptom) && styles.chipTextActive,
                ]}
              >
                {symptom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>NOTES</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={(t) => {
            setNote(t);
            setSaved(false);
          }}
          placeholder="How are you feeling today?"
          placeholderTextColor={COLORS.textLight}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.saveButton, saved && styles.saveButtonSaved]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>{saved ? 'Saved ✓' : 'Save'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 100,
  },
  title: {
    ...FONTS.headingLarge,
    marginBottom: SPACING.xs,
  },
  date: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...FONTS.label,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  flowRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  flowChip: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  flowChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryFaint,
  },
  flowEmoji: {
    fontSize: 24,
    marginBottom: SPACING.xs,
    color: COLORS.textSecondary,
  },
  flowLabel: {
    ...FONTS.small,
    fontWeight: '500',
  },
  flowLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  chipActive: {
    backgroundColor: COLORS.primaryFaint,
    borderColor: COLORS.primary,
  },
  chipText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  noteInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    minHeight: 100,
    ...FONTS.regular,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  saveButtonSaved: {
    backgroundColor: COLORS.success,
  },
  saveButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
});
