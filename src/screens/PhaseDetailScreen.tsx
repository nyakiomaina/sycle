import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PHASE_CONTENT } from '../data/phaseContent';
import { HORMONE_PROFILES } from '../data/hormoneData';
import { WORKOUT_GUIDANCE } from '../data/workoutPlans';
import { NUTRITION_GUIDANCE } from '../data/mealPlans';
import { PHASE_INSIGHTS } from '../data/phaseInsights';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import type { PhaseName, WorkoutIntensity } from '../types';

interface Props {
  route: { params: { phase: PhaseName } };
}

const LEVEL_COLORS: Record<string, string> = {
  very_low: '#A89E97',
  low: '#8BA3A0',
  rising: COLORS.follicular,
  moderate: COLORS.ovulatory,
  high: '#C88C79',
  peak: '#9E4A4A',
  falling: COLORS.luteal,
};

const INTENSITY_COLORS: Record<WorkoutIntensity, string> = {
  rest: COLORS.textLight,
  light: COLORS.follicular,
  moderate: COLORS.ovulatory,
  high: COLORS.menstrual,
  max: '#9E4A4A',
};

export default function PhaseDetailScreen({ route }: Props) {
  const { phase } = route.params;
  const content = PHASE_CONTENT[phase];
  const hormones = HORMONE_PROFILES[phase];
  const workout = WORKOUT_GUIDANCE[phase];
  const nutrition = NUTRITION_GUIDANCE[phase];
  const insights = PHASE_INSIGHTS[phase];

  const [expandedHormone, setExpandedHormone] = useState<string | null>(null);
  const [expandedSignals, setExpandedSignals] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[content.color + '18', content.color + '0A', COLORS.background]}
          style={styles.header}
        >
          <View style={[styles.headerIconCircle, { backgroundColor: content.color + '22' }]}>
            <Text style={styles.headerEmoji}>{content.emoji}</Text>
          </View>
          <Text style={[styles.headerTitle, { color: content.color }]}>
            {content.displayName}
          </Text>
          <Text style={styles.headerTagline}>{insights.tagline}</Text>
          {hormones.fertileWindow && (
            <View style={styles.fertileBadge}>
              <Text style={styles.fertileBadgeText}>Fertile Window</Text>
            </View>
          )}
        </LinearGradient>

        {/* Superpowers */}
        <SectionCard emoji="✨" title="Your Superpowers" color={content.color}>
          {insights.superpowers.map((sp) => (
            <View key={sp.name} style={styles.superpowerItem}>
              <Text style={[styles.superpowerName, { color: content.color }]}>{sp.name}</Text>
              <Text style={styles.superpowerDetail}>{sp.detail}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Body & Mood */}
        <SectionCard emoji="💭" title="Body & Mood" color={content.color}>
          <Text style={styles.sectionText}>{content.bodyMood}</Text>

          <View style={styles.insightGrid}>
            <InsightChip emoji="⚡" label="Energy" value={insights.energy.level} color={content.color} />
            <InsightChip
              emoji="🧠"
              label="Brain"
              value={phase === 'menstrual' ? 'Intuitive' : phase === 'follicular' ? 'Creative' : phase === 'ovulatory' ? 'Verbal peak' : 'Detail mode'}
              color={content.color}
            />
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Brain & Cognition</Text>
            <Text style={styles.sectionText}>{insights.brain}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Social Energy</Text>
            <Text style={styles.sectionText}>{insights.social}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Metabolism</Text>
            <Text style={styles.sectionText}>{insights.metabolism}</Text>
          </View>
        </SectionCard>

        {/* Body Signals */}
        <SectionCard emoji="🫀" title="Body Signals Explained" color={content.color}>
          <Text style={[styles.sectionText, { marginBottom: SPACING.sm }]}>
            What you might be feeling and why it's happening:
          </Text>
          {insights.bodySignals.slice(0, expandedSignals ? undefined : 3).map((bs) => (
            <View key={bs.signal} style={styles.signalItem}>
              <Text style={styles.signalName}>{bs.signal}</Text>
              <Text style={styles.signalWhy}>{bs.why}</Text>
            </View>
          ))}
          {insights.bodySignals.length > 3 && (
            <TouchableOpacity onPress={() => setExpandedSignals(!expandedSignals)} activeOpacity={0.7}>
              <Text style={[styles.expandLink, { color: content.color }]}>
                {expandedSignals ? 'Show less' : `Show all ${insights.bodySignals.length} signals`}
              </Text>
            </TouchableOpacity>
          )}
        </SectionCard>

        {/* Hormones */}
        <SectionCard emoji="🧬" title="Hormones" color={content.color}>
          <Text style={styles.sectionText}>{hormones.detail}</Text>
          <View style={styles.hormoneList}>
            {hormones.hormones.map((h) => (
              <TouchableOpacity
                key={h.name}
                style={styles.hormoneCard}
                activeOpacity={0.7}
                onPress={() => setExpandedHormone(expandedHormone === h.name ? null : h.name)}
              >
                <View style={styles.hormoneHeader}>
                  <Text style={styles.hormoneName}>{h.name}</Text>
                  <View style={[styles.levelBadge, { backgroundColor: (LEVEL_COLORS[h.level] || COLORS.textLight) + '20' }]}>
                    <Text style={[styles.levelText, { color: LEVEL_COLORS[h.level] || COLORS.textLight }]}>
                      {h.level.replace('_', ' ')}
                    </Text>
                  </View>
                </View>
                {expandedHormone === h.name ? (
                  <Text style={styles.hormoneDesc}>{h.description}</Text>
                ) : (
                  <Text style={styles.tapHint}>Tap for details</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </SectionCard>

        {/* Movement */}
        <SectionCard emoji="💪" title="Movement" color={content.color}>
          <View style={styles.intensityRow}>
            <View style={[styles.intensityBadge, { backgroundColor: INTENSITY_COLORS[workout.intensity] + '20' }]}>
              <Text style={[styles.intensityBadgeText, { color: INTENSITY_COLORS[workout.intensity] }]}>
                {workout.intensity} intensity
              </Text>
            </View>
          </View>
          <Text style={styles.sectionText}>{insights.movement.why}</Text>

          <Text style={[styles.detailLabel, { marginTop: SPACING.md }]}>Good options</Text>
          <View style={styles.typeList}>
            {insights.movement.types.map((t) => (
              <View key={t} style={[styles.typeTag, { backgroundColor: content.color + '10', borderColor: content.color + '25' }]}>
                <Text style={[styles.typeTagText, { color: content.color }]}>{t}</Text>
              </View>
            ))}
          </View>

          {insights.movement.caution && (
            <View style={styles.cautionBox}>
              <Text style={styles.cautionEmoji}>⚠️</Text>
              <Text style={styles.cautionText}>{insights.movement.caution}</Text>
            </View>
          )}

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Why this matters</Text>
            <Text style={[styles.sectionText, { fontStyle: 'italic' }]}>{workout.why}</Text>
          </View>
        </SectionCard>

        {/* Key Nutrients */}
        <SectionCard emoji="🍲" title="Key Nutrients" color={content.color}>
          <Text style={styles.sectionText}>{nutrition.focus}</Text>

          {nutrition.keyNutrients.map((n) => (
            <View key={n.nutrient} style={styles.nutrientRow}>
              <Text style={styles.nutrientName}>{n.nutrient}</Text>
              <Text style={styles.nutrientWhy}>{n.why}</Text>
              <Text style={[styles.nutrientSources, { color: content.color }]}>Sources: {n.sources}</Text>
            </View>
          ))}

          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>💧</Text>
            <Text style={styles.tipText}>{nutrition.hydration}</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipEmoji}>⚠️</Text>
            <Text style={styles.tipText}>{nutrition.avoid}</Text>
          </View>
        </SectionCard>

        {/* Self-Care */}
        <SectionCard emoji="🛁" title="Self-Care" color={content.color}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Sleep</Text>
            <Text style={styles.sectionText}>{insights.sleep}</Text>
          </View>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>Skin</Text>
            <Text style={styles.sectionText}>{insights.skin}</Text>
          </View>
          <Text style={[styles.detailLabel, { marginTop: SPACING.md }]}>Tips for this phase</Text>
          {insights.selfCare.map((tip, i) => (
            <View key={i} style={styles.selfCareTip}>
              <View style={[styles.tipBullet, { backgroundColor: content.color }]} />
              <Text style={styles.selfCareText}>{tip}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Fasting */}
        <SectionCard emoji="⏳" title="Fasting" color={content.color}>
          <Text style={styles.sectionText}>{content.fasting}</Text>
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionCard({
  emoji,
  title,
  color,
  children,
}: {
  emoji: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={[styles.sectionAccent, { backgroundColor: color }]} />
      <View style={styles.sectionContent}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconCircle, { backgroundColor: color + '15' }]}>
            <Text style={styles.sectionEmoji}>{emoji}</Text>
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
}

function InsightChip({ emoji, label, value, color }: { emoji: string; label: string; value: string; color: string }) {
  return (
    <View style={styles.insightChip}>
      <Text style={styles.insightChipEmoji}>{emoji}</Text>
      <Text style={styles.insightChipLabel}>{label}</Text>
      <Text style={[styles.insightChipValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.md, paddingBottom: 100 },

  header: {
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerIconCircle: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  headerEmoji: { fontSize: 36 },
  headerTitle: { fontFamily: FONT_FAMILY.serif, fontSize: 28, fontWeight: '400', marginBottom: SPACING.xs },
  headerTagline: { ...FONTS.regular, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22, paddingHorizontal: SPACING.md },
  fertileBadge: {
    backgroundColor: COLORS.ovulatory + '22',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginTop: SPACING.sm,
  },
  fertileBadgeText: { color: COLORS.ovulatory, fontWeight: '600', fontSize: 13 },

  section: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  sectionAccent: { width: 4 },
  sectionContent: { flex: 1, padding: SPACING.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  sectionIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  sectionEmoji: { fontSize: 18 },
  sectionTitle: { ...FONTS.subheading, fontSize: 18 },
  sectionText: { ...FONTS.regular, color: COLORS.textSecondary, lineHeight: 23, fontSize: 14 },

  superpowerItem: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  superpowerName: { fontWeight: '700', fontSize: 15, marginBottom: 3 },
  superpowerDetail: { ...FONTS.small, color: COLORS.textSecondary, lineHeight: 20 },

  insightGrid: { flexDirection: 'row', gap: SPACING.sm, marginVertical: SPACING.md },
  insightChip: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  insightChipEmoji: { fontSize: 18, marginBottom: 4 },
  insightChipLabel: { ...FONTS.caption, color: COLORS.textLight, marginBottom: 2 },
  insightChipValue: { fontSize: 13, fontWeight: '700' },

  detailBlock: { marginTop: SPACING.sm },
  detailLabel: { ...FONTS.label, marginBottom: SPACING.xs },

  signalItem: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  signalName: { fontWeight: '600', fontSize: 14, color: COLORS.text, marginBottom: 3 },
  signalWhy: { ...FONTS.small, color: COLORS.textSecondary, lineHeight: 20 },
  expandLink: { fontWeight: '600', fontSize: 14, marginTop: SPACING.sm },

  hormoneList: { marginTop: SPACING.md, gap: SPACING.sm },
  hormoneCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
  },
  hormoneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hormoneName: { fontWeight: '600', fontSize: 15, color: COLORS.text },
  levelBadge: { borderRadius: RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 2 },
  levelText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  hormoneDesc: { ...FONTS.small, color: COLORS.textSecondary, lineHeight: 20, marginTop: SPACING.xs },
  tapHint: { ...FONTS.caption, color: COLORS.primary, marginTop: 4, fontStyle: 'italic' },

  intensityRow: { marginBottom: SPACING.sm },
  intensityBadge: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  intensityBadgeText: { fontSize: 14, fontWeight: '700', textTransform: 'capitalize' },

  typeList: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.xs },
  typeTag: { borderWidth: 1, borderRadius: RADIUS.full, paddingHorizontal: SPACING.sm, paddingVertical: 4 },
  typeTagText: { fontSize: 13, fontWeight: '500' },

  cautionBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF3E2',
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginTop: SPACING.md,
  },
  cautionEmoji: { fontSize: 14, marginRight: SPACING.xs, marginTop: 2 },
  cautionText: { ...FONTS.small, color: COLORS.textSecondary, flex: 1, lineHeight: 20 },

  nutrientRow: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
  },
  nutrientName: { fontWeight: '600', fontSize: 15, marginBottom: 3 },
  nutrientWhy: { ...FONTS.small, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 4 },
  nutrientSources: { ...FONTS.small, fontStyle: 'italic' },

  tipItem: { flexDirection: 'row', marginTop: SPACING.sm },
  tipEmoji: { fontSize: 16, marginRight: SPACING.xs, marginTop: 2 },
  tipText: { ...FONTS.small, flex: 1, lineHeight: 20, color: COLORS.textSecondary },

  selfCareTip: { flexDirection: 'row', marginTop: SPACING.sm, alignItems: 'flex-start' },
  tipBullet: { width: 6, height: 6, borderRadius: 3, marginRight: SPACING.sm, marginTop: 7 },
  selfCareText: { ...FONTS.regular, color: COLORS.textSecondary, lineHeight: 22, fontSize: 14, flex: 1 },
});
