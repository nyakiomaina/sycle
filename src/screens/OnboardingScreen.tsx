import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { DISCLAIMER_TEXT } from '../data/phaseContent';
import { HEALTH_CONDITIONS, PREGNANCY_OPTIONS } from '../data/healthConditions';
import { useApp } from '../context/AppContext';
import type { PregnancyStatus } from '../types';

const TOTAL_STEPS = 5;

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current && styles.dotActive,
            i < current && styles.dotComplete,
          ]}
        />
      ))}
    </View>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.stepHeader}>
      <Text style={styles.stepTitle}>{title}</Text>
      {subtitle && <Text style={styles.stepSubtitle}>{subtitle}</Text>}
    </View>
  );
}

export default function OnboardingScreen() {
  const { setUser } = useApp();
  const [step, setStep] = useState(0);

  // Step 0: Welcome
  // Step 1: Username + body info
  const [username, setUsername] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  // Step 2: Cycle info
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');

  // Step 3: Health
  const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatus>('not_pregnant');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Step 4: Consent

  const animateStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const validateAndNext = () => {
    if (step === 1) {
      if (!username.trim()) {
        Alert.alert('What should we call you?', 'Please enter a name or nickname.');
        return;
      }
    }
    if (step === 2) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(lastPeriodDate)) {
        Alert.alert('Please enter a valid date', 'Use the format YYYY-MM-DD (e.g. 2025-05-15)');
        return;
      }
      if (isNaN(new Date(lastPeriodDate).getTime())) {
        Alert.alert('Invalid date', 'Please check the date you entered.');
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
    }
    animateStep(step + 1);
  };

  const handleComplete = async () => {
    await setUser({
      id: Date.now().toString(),
      username: username.trim(),
      birthYear: birthYear ? parseInt(birthYear, 10) : undefined,
      heightCm: heightCm ? parseFloat(heightCm) : undefined,
      weightKg: weightKg ? parseFloat(weightKg) : undefined,
      averageCycleLength: parseInt(cycleLength, 10),
      averagePeriodLength: parseInt(periodLength, 10),
      lastPeriodStartDate: lastPeriodDate,
      pregnancyStatus,
      healthConditions: selectedConditions,
      hasConsented: true,
    });
  };

  const toggleCondition = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Step 0 — Welcome
  if (step === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🌸</Text>
          </View>
          <Text style={styles.welcomeTitle}>Cycle</Text>
          <Text style={styles.welcomeTagline}>
            Your body has a rhythm.{'\n'}Let's learn it together.
          </Text>
          <Text style={styles.welcomeBody}>
            Understand how your hormones shape your energy, mood, nutrition, and movement — every
            day of your cycle.
          </Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => animateStep(1)}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.topBar}>
            {step > 1 && (
              <TouchableOpacity onPress={() => animateStep(step - 1)}>
                <Text style={styles.backButton}>← Back</Text>
              </TouchableOpacity>
            )}
            <View style={{ flex: 1 }} />
            <ProgressDots current={step - 1} total={TOTAL_STEPS - 1} />
            <View style={{ flex: 1 }} />
            {step > 1 && <View style={{ width: 50 }} />}
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Step 1 — About you */}
            {step === 1 && (
              <>
                <StepHeader
                  title="About you"
                  subtitle="What should we call you? The rest is optional — but it helps us give you more personalized guidance."
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>WHAT SHOULD WE CALL YOU?</Text>
                  <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Your name or nickname"
                    placeholderTextColor={COLORS.textLight}
                    autoFocus
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>BIRTH YEAR (OPTIONAL)</Text>
                  <TextInput
                    style={styles.input}
                    value={birthYear}
                    onChangeText={setBirthYear}
                    placeholder="e.g. 1995"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.sm }]}>
                    <Text style={styles.label}>HEIGHT CM (OPTIONAL)</Text>
                    <TextInput
                      style={styles.input}
                      value={heightCm}
                      onChangeText={setHeightCm}
                      placeholder="e.g. 165"
                      placeholderTextColor={COLORS.textLight}
                      keyboardType="decimal-pad"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: SPACING.sm }]}>
                    <Text style={styles.label}>WEIGHT KG (OPTIONAL)</Text>
                    <TextInput
                      style={styles.input}
                      value={weightKg}
                      onChangeText={setWeightKg}
                      placeholder="e.g. 60"
                      placeholderTextColor={COLORS.textLight}
                      keyboardType="decimal-pad"
                    />
                  </View>
                </View>
              </>
            )}

            {/* Step 2 — Cycle info */}
            {step === 2 && (
              <>
                <StepHeader
                  title="Your cycle"
                  subtitle="This helps us calculate which phase you're in today. You can always update these later."
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>WHEN DID YOUR LAST PERIOD START?</Text>
                  <TextInput
                    style={styles.input}
                    value={lastPeriodDate}
                    onChangeText={setLastPeriodDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="numbers-and-punctuation"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>AVERAGE CYCLE LENGTH (DAYS)</Text>
                  <Text style={styles.hint}>
                    Most cycles are 24–35 days. If you're not sure, 28 is a common starting point.
                    Every body is different — there's no wrong answer.
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={cycleLength}
                    onChangeText={setCycleLength}
                    placeholder="28"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>AVERAGE PERIOD LENGTH (DAYS)</Text>
                  <TextInput
                    style={styles.input}
                    value={periodLength}
                    onChangeText={setPeriodLength}
                    placeholder="5"
                    placeholderTextColor={COLORS.textLight}
                    keyboardType="number-pad"
                  />
                </View>
              </>
            )}

            {/* Step 3 — Health */}
            {step === 3 && (
              <>
                <StepHeader
                  title="Your health"
                  subtitle="This is completely optional. Sharing helps us give more relevant guidance, but you can skip anything you're not comfortable with."
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>PREGNANCY STATUS</Text>
                  {PREGNANCY_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.optionCard,
                        pregnancyStatus === opt.value && styles.optionCardActive,
                      ]}
                      onPress={() => setPregnancyStatus(opt.value as PregnancyStatus)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.optionRow}>
                        <View
                          style={[
                            styles.radio,
                            pregnancyStatus === opt.value && styles.radioActive,
                          ]}
                        >
                          {pregnancyStatus === opt.value && <View style={styles.radioInner} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={[
                              styles.optionLabel,
                              pregnancyStatus === opt.value && styles.optionLabelActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                          {opt.description ? (
                            <Text style={styles.optionDesc}>{opt.description}</Text>
                          ) : null}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>ANY CONDITIONS THAT AFFECT YOUR CYCLE?</Text>
                  <Text style={styles.hint}>
                    Select any that apply. This helps us note when certain guidance may need
                    adjusting for you.
                  </Text>
                  <View style={styles.conditionsGrid}>
                    {HEALTH_CONDITIONS.map((cond) => (
                      <TouchableOpacity
                        key={cond.id}
                        style={[
                          styles.conditionChip,
                          selectedConditions.includes(cond.id) && styles.conditionChipActive,
                        ]}
                        onPress={() => toggleCondition(cond.id)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.conditionChipText,
                            selectedConditions.includes(cond.id) && styles.conditionChipTextActive,
                          ]}
                        >
                          {cond.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}

            {/* Step 4 — Consent */}
            {step === 4 && (
              <>
                <StepHeader title="Before we begin" />

                <View style={styles.disclaimerBox}>
                  <Text style={styles.disclaimerText}>{DISCLAIMER_TEXT}</Text>
                </View>

                <View style={styles.privacyBox}>
                  <Text style={styles.privacyIcon}>🔒</Text>
                  <Text style={styles.privacyTitle}>Your data stays with you</Text>
                  <Text style={styles.privacyText}>
                    All your data is stored only on this device. We don't use any cloud services,
                    analytics, ad networks, or third-party trackers. You can export or permanently
                    delete your data at any time from Settings.
                  </Text>
                </View>
              </>
            )}

            {/* Continue / Complete button */}
            {step < 4 ? (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={validateAndNext}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleComplete}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>I understand — let's go ✨</Text>
              </TouchableOpacity>
            )}

            {step === 3 && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => animateStep(4)}
                activeOpacity={0.7}
              >
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  backButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  dotComplete: {
    backgroundColor: COLORS.primaryLight,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryFaint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  logoEmoji: {
    fontSize: 48,
  },
  welcomeTitle: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 44,
    fontWeight: '400',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  welcomeTagline: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: SPACING.lg,
  },
  welcomeBody: {
    ...FONTS.regular,
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    lineHeight: 26,
    paddingHorizontal: SPACING.md,
  },
  stepHeader: {
    marginBottom: SPACING.lg,
  },
  stepTitle: {
    ...FONTS.headingLarge,
    marginBottom: SPACING.sm,
  },
  stepSubtitle: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  label: {
    ...FONTS.label,
    marginBottom: SPACING.sm,
  },
  hint: {
    ...FONTS.small,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 17,
    color: COLORS.text,
    ...SHADOWS.sm,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    marginTop: SPACING.md,
    ...SHADOWS.md,
  },
  primaryButtonText: {
    color: COLORS.textOnPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  skipButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '500',
  },
  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  optionCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryFaint,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  optionLabel: {
    ...FONTS.regular,
    fontWeight: '500',
  },
  optionLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  optionDesc: {
    ...FONTS.small,
    marginTop: 2,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  conditionChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  conditionChipActive: {
    backgroundColor: COLORS.primaryFaint,
    borderColor: COLORS.primary,
  },
  conditionChipText: {
    ...FONTS.small,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  conditionChipTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  disclaimerBox: {
    backgroundColor: COLORS.roseGoldFaint,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.roseGoldLight,
  },
  disclaimerText: {
    ...FONTS.regular,
    color: COLORS.text,
    lineHeight: 24,
  },
  privacyBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  privacyIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  privacyTitle: {
    ...FONTS.subheading,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  privacyText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
});
