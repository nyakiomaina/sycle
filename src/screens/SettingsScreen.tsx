import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { DISCLAIMER_TEXT } from '../data/phaseContent';
import { HEALTH_CONDITIONS } from '../data/healthConditions';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import type { PregnancyStatus } from '../types';

export default function SettingsScreen() {
  const { user, updateUser, deleteAllData, exportData } = useApp();

  const [username, setUsername] = useState(user?.username || '');
  const [cycleLength, setCycleLength] = useState(user?.averageCycleLength?.toString() || '28');
  const [periodLength, setPeriodLength] = useState(user?.averagePeriodLength?.toString() || '5');
  const [lastPeriodDate, setLastPeriodDate] = useState(user?.lastPeriodStartDate || '');
  const [heightCm, setHeightCm] = useState(user?.heightCm?.toString() || '');
  const [weightKg, setWeightKg] = useState(user?.weightKg?.toString() || '');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showHealth, setShowHealth] = useState(false);

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert('Username', 'Please enter a name or nickname.');
      return;
    }
    const cl = parseInt(cycleLength, 10);
    const pl = parseInt(periodLength, 10);
    if (isNaN(cl) || cl < 20 || cl > 45) {
      Alert.alert('Cycle length', 'Please enter a number between 20 and 45 days.');
      return;
    }
    if (isNaN(pl) || pl < 2 || pl > 10) {
      Alert.alert('Period length', 'Please enter a number between 2 and 10 days.');
      return;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(lastPeriodDate)) {
      Alert.alert('Date format', 'Use the format YYYY-MM-DD.');
      return;
    }

    await updateUser({
      username: username.trim(),
      averageCycleLength: cl,
      averagePeriodLength: pl,
      lastPeriodStartDate: lastPeriodDate,
      heightCm: heightCm ? parseFloat(heightCm) : undefined,
      weightKg: weightKg ? parseFloat(weightKg) : undefined,
    });

    Alert.alert('Saved ✨', 'Your settings have been updated.');
  };

  const handleExport = async () => {
    const data = await exportData();
    await Share.share({ message: data, title: 'My Cycle Data' });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete all data',
      'This will permanently remove all your data from this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete everything', style: 'destructive', onPress: deleteAllData },
      ]
    );
  };

  const currentConditions =
    user?.healthConditions
      ?.map((id) => HEALTH_CONDITIONS.find((c) => c.id === id)?.name)
      .filter(Boolean) || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>

        {/* Profile section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>

          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Your name or nickname"
            placeholderTextColor={COLORS.textLight}
          />

          <View style={styles.inputRow}>
            <View style={[styles.inputHalf, { marginRight: SPACING.sm }]}>
              <Text style={styles.label}>HEIGHT (CM)</Text>
              <TextInput
                style={styles.input}
                value={heightCm}
                onChangeText={setHeightCm}
                placeholder="—"
                placeholderTextColor={COLORS.textLight}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={[styles.inputHalf, { marginLeft: SPACING.sm }]}>
              <Text style={styles.label}>WEIGHT (KG)</Text>
              <TextInput
                style={styles.input}
                value={weightKg}
                onChangeText={setWeightKg}
                placeholder="—"
                placeholderTextColor={COLORS.textLight}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        {/* Cycle section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cycle details</Text>

          <Text style={styles.label}>LAST PERIOD START DATE</Text>
          <TextInput
            style={styles.input}
            value={lastPeriodDate}
            onChangeText={setLastPeriodDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numbers-and-punctuation"
          />

          <View style={styles.inputRow}>
            <View style={[styles.inputHalf, { marginRight: SPACING.sm }]}>
              <Text style={styles.label}>CYCLE LENGTH</Text>
              <TextInput
                style={styles.input}
                value={cycleLength}
                onChangeText={setCycleLength}
                placeholder="28"
                placeholderTextColor={COLORS.textLight}
                keyboardType="number-pad"
              />
            </View>
            <View style={[styles.inputHalf, { marginLeft: SPACING.sm }]}>
              <Text style={styles.label}>PERIOD LENGTH</Text>
              <TextInput
                style={styles.input}
                value={periodLength}
                onChangeText={setPeriodLength}
                placeholder="5"
                placeholderTextColor={COLORS.textLight}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>

        {/* Health conditions */}
        {currentConditions.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity onPress={() => setShowHealth(!showHealth)}>
              <Text style={styles.sectionTitle}>
                Health conditions {showHealth ? '▾' : '▸'}
              </Text>
            </TouchableOpacity>
            {showHealth && (
              <View style={styles.conditionsList}>
                {currentConditions.map((name) => (
                  <View key={name} style={styles.conditionTag}>
                    <Text style={styles.conditionTagText}>{name}</Text>
                  </View>
                ))}
                <Text style={styles.conditionHint}>
                  To update your health conditions, please go through onboarding again by deleting
                  your data below.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Data section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your data</Text>
          <Text style={styles.privacyNote}>
            🔒 All your data is stored only on this device. No cloud, no trackers, no third
            parties.
          </Text>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={handleExport}
            activeOpacity={0.7}
          >
            <Text style={styles.outlineButtonText}>Export my data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Text style={styles.dangerButtonText}>Delete all my data</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => setShowDisclaimer(!showDisclaimer)}>
            <Text style={styles.linkText}>
              {showDisclaimer ? 'Hide disclaimer ▾' : 'View disclaimer ▸'}
            </Text>
          </TouchableOpacity>
          {showDisclaimer && (
            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>{DISCLAIMER_TEXT}</Text>
            </View>
          )}
        </View>
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
    marginBottom: SPACING.lg,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sectionTitle: {
    ...FONTS.subheading,
    marginBottom: SPACING.md,
  },
  label: {
    ...FONTS.label,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputHalf: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  saveButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNote: {
    ...FONTS.small,
    marginBottom: SPACING.md,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '600',
  },
  conditionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  conditionTag: {
    backgroundColor: COLORS.primaryFaint,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  conditionTagText: {
    ...FONTS.small,
    color: COLORS.primary,
    fontWeight: '500',
  },
  conditionHint: {
    ...FONTS.caption,
    width: '100%',
    marginTop: SPACING.sm,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  disclaimerBox: {
    backgroundColor: COLORS.roseGoldFaint,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.roseGoldLight,
  },
  disclaimerText: {
    ...FONTS.regular,
    lineHeight: 22,
    fontSize: 14,
  },
});
