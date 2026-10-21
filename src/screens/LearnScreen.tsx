import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { PHASE_CONTENT } from '../data/phaseContent';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS } from '../utils/theme';
import type { PhaseName } from '../types';

const PHASES: PhaseName[] = ['menstrual', 'follicular', 'ovulatory', 'luteal'];

export default function LearnScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Cycle Phases</Text>
        <Text style={styles.subtitle}>
          Tap any phase to learn what's happening in your body and how to support yourself through
          it.
        </Text>

        {PHASES.map((phase) => {
          const content = PHASE_CONTENT[phase];
          return (
            <TouchableOpacity
              key={phase}
              style={styles.phaseCard}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PhaseDetail', { phase })}
            >
              <View style={[styles.phaseAccent, { backgroundColor: content.color }]} />
              <View style={styles.phaseCardContent}>
                <View style={styles.phaseCardHeader}>
                  <View style={[styles.emojiCircle, { backgroundColor: content.color + '18' }]}>
                    <Text style={styles.phaseEmoji}>{content.emoji}</Text>
                  </View>
                  <View style={styles.phaseCardInfo}>
                    <Text style={[styles.phaseCardName, { color: content.color }]}>
                      {content.displayName}
                    </Text>
                    <Text style={styles.phaseCardHormones} numberOfLines={2}>
                      {content.hormones.slice(0, 100)}…
                    </Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    lineHeight: 24,
  },
  phaseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  phaseAccent: {
    width: 4,
  },
  phaseCardContent: {
    flex: 1,
    padding: SPACING.md,
  },
  phaseCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  phaseEmoji: {
    fontSize: 24,
  },
  phaseCardInfo: {
    flex: 1,
  },
  phaseCardName: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: SPACING.xs,
  },
  phaseCardHormones: {
    ...FONTS.small,
    lineHeight: 18,
    fontSize: 13,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
});
