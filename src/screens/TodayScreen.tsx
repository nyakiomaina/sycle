import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { format, differenceInDays } from 'date-fns';
import { useApp } from '../context/AppContext';
import { getPhaseForDate, isLateLuteal, getFertileWindow, getNextPeriodDate } from '../utils/phaseEngine';
import { HORMONE_PROFILES } from '../data/hormoneData';
import { WORKOUT_GUIDANCE } from '../data/workoutPlans';
import { NUTRITION_GUIDANCE } from '../data/mealPlans';
import { PHASE_INSIGHTS, CYCLE_FACTS } from '../data/phaseInsights';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS } from '../utils/theme';
import CycleWheel from '../components/CycleWheel';
import DayStrip from '../components/DayStrip';
import type { WorkoutIntensity } from '../types';

const INTENSITY_COLORS: Record<WorkoutIntensity, string> = {
  rest: COLORS.textLight,
  light: COLORS.follicular,
  moderate: COLORS.ovulatory,
  high: COLORS.menstrual,
  max: '#9E4A4A',
};

export default function TodayScreen() {
  const { user } = useApp();
  const navigation = useNavigation<any>();
  const [previewDayOffset, setPreviewDayOffset] = useState<number | null>(null);

  const handleDayPreview = useCallback(
    (day: number | null) => {
      if (!user || day === null) {
        setPreviewDayOffset(null);
        return;
      }
      const todayPhase = getPhaseForDate(
        user.lastPeriodStartDate,
        user.averageCycleLength,
        user.averagePeriodLength
      );
      setPreviewDayOffset(day - todayPhase.cycleDay);
    },
    [user]
  );

  const phaseInfo = useMemo(() => {
    if (!user) return null;
    return getPhaseForDate(
      user.lastPeriodStartDate,
      user.averageCycleLength,
      user.averagePeriodLength
    );
  }, [user]);

  const fertile = useMemo(() => {
    if (!phaseInfo || !user) return null;
    return getFertileWindow(phaseInfo.cycleDay, user.averageCycleLength);
  }, [phaseInfo, user]);

  const nextPeriod = useMemo(() => {
    if (!user) return null;
    return getNextPeriodDate(user.lastPeriodStartDate, user.averageCycleLength);
  }, [user]);

  if (!user || !phaseInfo || !fertile) return null;

  const hormoneProfile = HORMONE_PROFILES[phaseInfo.name];
  const workout = WORKOUT_GUIDANCE[phaseInfo.name];
  const nutrition = NUTRITION_GUIDANCE[phaseInfo.name];
  const insights = PHASE_INSIGHTS[phaseInfo.name];
  const lateLuteal = isLateLuteal(
    phaseInfo.cycleDay,
    user.averageCycleLength,
    user.averagePeriodLength
  );

  const daysUntilPeriod = nextPeriod
    ? differenceInDays(nextPeriod, new Date())
    : null;

  const dailyInsight = insights.dailyInsights[
    (phaseInfo.dayInPhase - 1) % insights.dailyInsights.length
  ];
  const cycleFact = CYCLE_FACTS[
    (phaseInfo.cycleDay - 1) % CYCLE_FACTS.length
  ];

  const greeting = getGreeting();
  const pc = phaseInfo.color;

  const goToDetail = () =>
    navigation.navigate('LearnTab', {
      screen: 'PhaseDetail',
      params: { phase: phaseInfo.name },
    });

  return (
    <View style={styles.root}>
      {/* Fixed header with interactive wheel — outside ScrollView to avoid gesture conflict */}
      <LinearGradient
        colors={[pc + '18', pc + '08', COLORS.background]}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{greeting}, {user.username}</Text>
            <Text style={styles.dateText}>{format(new Date(), 'EEEE, MMMM d')}</Text>
          </View>
          <CycleWheel
            cycleLength={user.averageCycleLength}
            periodLength={user.averagePeriodLength}
            currentDay={phaseInfo.cycleDay}
            phaseName={phaseInfo.name}
            phaseDisplayName={phaseInfo.displayName}
            phaseEmoji={phaseInfo.emoji}
            onDayPreview={handleDayPreview}
          />
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <DayStrip
            lastPeriodStartDate={user.lastPeriodStartDate}
            cycleLength={user.averageCycleLength}
            periodLength={user.averagePeriodLength}
            previewDayOffset={previewDayOffset}
          />

          {/* Hero card */}
          <TouchableOpacity activeOpacity={0.7} onPress={goToDetail}>
            <LinearGradient
              colors={[pc + '14', pc + '08']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroTop}>
                <View style={[styles.phaseBadge, { backgroundColor: pc + '25' }]}>
                  <Text style={[styles.phaseBadgeText, { color: pc }]}>
                    {phaseInfo.displayName} Phase
                  </Text>
                </View>
                <Text style={[styles.heroArrow, { color: pc }]}>›</Text>
              </View>
              <Text style={styles.heroTagline}>{insights.tagline}</Text>
              <Text style={styles.heroInsight}>{dailyInsight}</Text>
              <View style={styles.chipRow}>
                {insights.superpowers.slice(0, 3).map((sp) => (
                  <View key={sp.name} style={[styles.chip, { backgroundColor: '#FFFFFF90', borderColor: pc + '35' }]}>
                    <Text style={[styles.chipText, { color: pc }]}>{sp.name}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Predictions */}
          {fertile.isFertile ? (
            <View style={[styles.alertCard, { borderLeftColor: COLORS.ovulatory }]}>
              <LinearGradient colors={[COLORS.ovulatory + '12', COLORS.ovulatory + '06']} style={styles.alertGradient}>
                <Text style={styles.alertEmoji}>🔥</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.alertTitle, { color: COLORS.ovulatory }]}>
                    {fertile.isOvulationDay ? 'Ovulation Day' : 'Fertile Window'}
                  </Text>
                  <Text style={styles.alertSub}>
                    {fertile.isOvulationDay ? 'Peak fertility — your most powerful hormonal day' : `Ovulation in ~${fertile.daysUntilOvulation} days`}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : fertile.daysUntilFertile !== null && fertile.daysUntilFertile <= 7 ? (
            <View style={[styles.alertCard, { borderLeftColor: COLORS.follicular }]}>
              <LinearGradient colors={[COLORS.follicular + '12', COLORS.follicular + '06']} style={styles.alertGradient}>
                <Text style={styles.alertEmoji}>🌱</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.alertTitle, { color: COLORS.follicular }]}>
                    Fertile window in {fertile.daysUntilFertile} days
                  </Text>
                  <Text style={styles.alertSub}>Ovulation est. day {fertile.ovulationDay}</Text>
                </View>
              </LinearGradient>
            </View>
          ) : null}

          {daysUntilPeriod !== null && daysUntilPeriod <= 10 && (
            <View style={[styles.alertCard, { borderLeftColor: COLORS.menstrual }]}>
              <LinearGradient colors={[COLORS.menstrual + '12', COLORS.menstrual + '06']} style={styles.alertGradient}>
                <Text style={styles.alertEmoji}>🌙</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.alertTitle, { color: COLORS.menstrual }]}>
                    {daysUntilPeriod === 0 ? 'Period expected today' : `Period in ~${daysUntilPeriod} days`}
                  </Text>
                  <Text style={styles.alertSub}>{format(nextPeriod!, 'MMM d')}</Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Quick insights */}
          <View style={styles.insightsRow}>
            <InsightPill emoji="⚡" label="Energy" value={insights.energy.level} color={pc} />
            <InsightPill
              emoji="🧠"
              label="Brain"
              value={
                phaseInfo.name === 'menstrual' ? 'Intuitive' :
                phaseInfo.name === 'follicular' ? 'Creative' :
                phaseInfo.name === 'ovulatory' ? 'Verbal peak' : 'Detail mode'
              }
              color={pc}
            />
            <InsightPill
              emoji="👥"
              label="Social"
              value={
                phaseInfo.name === 'menstrual' ? 'Inward' :
                phaseInfo.name === 'follicular' ? 'Building' :
                phaseInfo.name === 'ovulatory' ? 'Magnetic' : 'Selective'
              }
              color={pc}
            />
          </View>

          {/* Hormones */}
          <TouchableOpacity activeOpacity={0.7} onPress={goToDetail}>
            <Card accent={pc}>
              <View style={styles.cardHeader}>
                <CardIcon color={pc} emoji="🧬" />
                <Text style={styles.cardTitle}>Hormones</Text>
                <Text style={[styles.arrow, { color: pc }]}>›</Text>
              </View>
              <Text style={styles.cardBody}>{hormoneProfile.summary}</Text>
              <View style={styles.chipRow}>
                {hormoneProfile.hormones.slice(0, 3).map((h) => (
                  <View key={h.name} style={[styles.statChip, { backgroundColor: pc + '0C' }]}>
                    <Text style={styles.statLabel}>{h.name.split(' ')[0]}</Text>
                    <Text style={[styles.statValue, { color: pc }]}>
                      {h.level.replace('_', ' ')}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>

          {/* Movement */}
          <Card accent={pc}>
            <View style={styles.cardHeader}>
              <CardIcon color={pc} emoji="💪" />
              <Text style={styles.cardTitle}>Movement</Text>
              <View style={[styles.badge, { backgroundColor: INTENSITY_COLORS[workout.intensity] + '20' }]}>
                <Text style={[styles.badgeText, { color: INTENSITY_COLORS[workout.intensity] }]}>
                  {workout.intensity}
                </Text>
              </View>
            </View>
            <Text style={styles.cardBody}>{insights.movement.why}</Text>
            <View style={styles.chipRow}>
              {insights.movement.types.slice(0, 4).map((t) => (
                <View key={t} style={[styles.chip, { backgroundColor: pc + '0C', borderColor: pc + '25' }]}>
                  <Text style={[styles.chipText, { color: pc }]}>{t}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Nourishment */}
          <TouchableOpacity activeOpacity={0.7} onPress={goToDetail}>
            <Card accent={pc}>
              <View style={styles.cardHeader}>
                <CardIcon color={pc} emoji="🍲" />
                <Text style={styles.cardTitle}>Nourishment</Text>
                <Text style={[styles.arrow, { color: pc }]}>›</Text>
              </View>
              <Text style={styles.cardBody}>{nutrition.focus}</Text>
              <View style={styles.chipRow}>
                {nutrition.keyNutrients.slice(0, 3).map((n) => (
                  <View key={n.nutrient} style={[styles.chip, { backgroundColor: pc + '0C', borderColor: pc + '25' }]}>
                    <Text style={[styles.chipText, { color: pc }]}>{n.nutrient}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>

          {/* Body Signals */}
          {insights.bodySignals.length > 0 && (
            <Card accent={pc}>
              <View style={styles.cardHeader}>
                <CardIcon color={pc} emoji="🫀" />
                <Text style={styles.cardTitle}>Body Signals</Text>
              </View>
              {insights.bodySignals.slice(0, 3).map((bs) => (
                <View key={bs.signal} style={styles.signalItem}>
                  <View style={[styles.signalDot, { backgroundColor: pc }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.signalName}>{bs.signal}</Text>
                    <Text style={styles.signalWhy}>{bs.why}</Text>
                  </View>
                </View>
              ))}
            </Card>
          )}

          {/* Did You Know */}
          <View style={styles.factCard}>
            <View style={[styles.factAccent, { backgroundColor: pc }]} />
            <View style={styles.factContent}>
              <Text style={[styles.factLabel, { color: pc }]}>DID YOU KNOW?</Text>
              <Text style={styles.factText}>{cycleFact}</Text>
            </View>
          </View>

          {/* Late luteal fasting */}
          {lateLuteal && (
            <Card accent={COLORS.luteal}>
              <View style={styles.cardHeader}>
                <CardIcon color={COLORS.luteal} emoji="⏳" />
                <Text style={styles.cardTitle}>Fasting</Text>
              </View>
              <Text style={styles.cardBody}>
                Your body needs more fuel right now. Your metabolic rate is elevated 100-300 calories above baseline.
                Many women find it helpful to ease off fasting during the late luteal phase. Honoring your hunger is not a failure — it's biology.
              </Text>
            </Card>
          )}

          {/* Health note */}
          {user.healthConditions.length > 0 && (
            <View style={styles.healthNote}>
              <Text style={styles.healthEmoji}>💡</Text>
              <Text style={styles.healthText}>
                Some guidance may vary based on your health profile. Always listen to your body and
                consult your healthcare provider for personalized advice.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function Card({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardAccent, { backgroundColor: accent }]} />
      <View style={styles.cardInner}>{children}</View>
    </View>
  );
}

function CardIcon({ color, emoji }: { color: string; emoji: string }) {
  return (
    <View style={[styles.iconCircle, { backgroundColor: color + '12' }]}>
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
    </View>
  );
}

function InsightPill({ emoji, label, value, color }: { emoji: string; label: string; value: string; color: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillEmoji}>{emoji}</Text>
      <Text style={styles.pillLabel}>{label}</Text>
      <Text style={[styles.pillValue, { color }]}>{value}</Text>
    </View>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 100 },
  headerGradient: { paddingHorizontal: SPACING.md },
  greetingSection: { marginBottom: SPACING.xs, marginTop: SPACING.sm },
  greeting: { fontFamily: FONT_FAMILY.serif, fontSize: 30, fontWeight: '400', color: COLORS.text },
  dateText: { ...FONTS.regular, color: COLORS.textSecondary, marginTop: 2 },

  content: { paddingHorizontal: SPACING.md },

  // Hero card
  heroCard: { borderRadius: RADIUS.xxl, padding: SPACING.lg, marginBottom: SPACING.md, marginTop: SPACING.sm },
  heroTop: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  phaseBadge: { borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: 5 },
  phaseBadgeText: { fontSize: 14, fontWeight: '700' },
  heroArrow: { fontSize: 24, marginLeft: 'auto', fontWeight: '300' },
  heroTagline: { fontSize: 17, fontWeight: '700', color: COLORS.text, lineHeight: 24, marginBottom: SPACING.sm },
  heroInsight: { ...FONTS.regular, color: COLORS.textSecondary, lineHeight: 23, fontSize: 15, marginBottom: SPACING.md },

  // Alert cards
  alertCard: {
    borderRadius: RADIUS.lg,
    borderLeftWidth: 3,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  alertGradient: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md },
  alertEmoji: { fontSize: 22, marginRight: SPACING.sm },
  alertTitle: { fontWeight: '700', fontSize: 15 },
  alertSub: { ...FONTS.small, color: COLORS.textSecondary, marginTop: 2 },

  // Insight pills
  insightsRow: { flexDirection: 'row', gap: SPACING.sm, marginVertical: SPACING.md },
  pill: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  pillEmoji: { fontSize: 20, marginBottom: 4 },
  pillLabel: { fontSize: 11, color: COLORS.textLight, fontWeight: '500', marginBottom: 2 },
  pillValue: { fontSize: 12, fontWeight: '700', textAlign: 'center' },

  // Cards
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardAccent: { width: 4 },
  cardInner: { flex: 1, padding: SPACING.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  cardTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text, flex: 1 },
  arrow: { fontSize: 22, fontWeight: '300' },
  cardBody: { ...FONTS.regular, color: COLORS.textSecondary, lineHeight: 22, fontSize: 14 },

  badge: { borderRadius: RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 3 },
  badgeText: { fontSize: 13, fontWeight: '700', textTransform: 'capitalize' },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.sm },
  chip: { borderWidth: 1, borderRadius: RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  chipText: { fontSize: 12, fontWeight: '600' },

  statChip: { flex: 1, borderRadius: RADIUS.md, paddingVertical: SPACING.xs, paddingHorizontal: SPACING.xs, alignItems: 'center' },
  statLabel: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500', marginBottom: 2 },
  statValue: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },

  // Body signals
  signalItem: { flexDirection: 'row', marginBottom: SPACING.sm },
  signalDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: SPACING.sm },
  signalName: { fontWeight: '600', fontSize: 14, color: COLORS.text, marginBottom: 2 },
  signalWhy: { ...FONTS.small, color: COLORS.textSecondary, lineHeight: 19 },

  // Fact card
  factCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  factAccent: { width: 4 },
  factContent: { flex: 1, padding: SPACING.md },
  factLabel: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: SPACING.xs },
  factText: { ...FONTS.regular, color: COLORS.textSecondary, lineHeight: 22, fontSize: 14 },

  // Health note
  healthNote: {
    flexDirection: 'row',
    backgroundColor: COLORS.roseGoldFaint,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.roseGoldLight,
  },
  healthEmoji: { fontSize: 18, marginRight: SPACING.sm, marginTop: 2 },
  healthText: { ...FONTS.small, flex: 1, lineHeight: 20, color: COLORS.textSecondary },
});
