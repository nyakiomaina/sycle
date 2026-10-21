import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { addDays, format, isSameDay, startOfDay } from 'date-fns';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { getPhaseForDate } from '../utils/phaseEngine';

interface DayStripProps {
  lastPeriodStartDate: string;
  cycleLength: number;
  periodLength: number;
  previewDayOffset?: number | null;
}

const DAY_WIDTH = 48;
const VISIBLE_DAYS = 7;
const BUFFER_DAYS = 60;

export default function DayStrip({
  lastPeriodStartDate,
  cycleLength,
  periodLength,
  previewDayOffset,
}: DayStripProps) {
  const scrollRef = useRef<ScrollView>(null);
  const today = startOfDay(new Date());

  const days = Array.from({ length: BUFFER_DAYS * 2 + 1 }, (_, i) =>
    addDays(today, i - BUFFER_DAYS)
  );

  const scrollToIndex = useCallback(
    (index: number, animated: boolean) => {
      const offset = index * DAY_WIDTH - (VISIBLE_DAYS * DAY_WIDTH) / 2 + DAY_WIDTH / 2;
      scrollRef.current?.scrollTo({ x: Math.max(0, offset), animated });
    },
    []
  );

  useEffect(() => {
    setTimeout(() => scrollToIndex(BUFFER_DAYS, false), 50);
  }, [scrollToIndex]);

  useEffect(() => {
    if (previewDayOffset != null) {
      scrollToIndex(BUFFER_DAYS + previewDayOffset, true);
    } else {
      scrollToIndex(BUFFER_DAYS, true);
    }
  }, [previewDayOffset, scrollToIndex]);

  const previewDate = previewDayOffset != null ? addDays(today, previewDayOffset) : null;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={DAY_WIDTH}
        decelerationRate="fast"
      >
        {days.map((date) => {
          const isToday = isSameDay(date, today);
          const isPreview = previewDate ? isSameDay(date, previewDate) : false;
          const phase = getPhaseForDate(lastPeriodStartDate, cycleLength, periodLength, date);
          const highlighted = isPreview || (!previewDate && isToday);

          return (
            <View
              key={date.toISOString()}
              style={[
                styles.dayItem,
                highlighted && styles.highlightedItem,
                isPreview && !isToday && { backgroundColor: phase.color + '18' },
              ]}
            >
              <Text style={[styles.dayLabel, highlighted && styles.highlightedLabel]}>
                {format(date, 'EEEEE')}
              </Text>
              <Text style={[styles.dayNumber, highlighted && styles.highlightedNumber]}>
                {format(date, 'd')}
              </Text>
              <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
  },
  dayItem: {
    width: DAY_WIDTH,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  highlightedItem: {
    backgroundColor: COLORS.primaryFaint,
  },
  dayLabel: {
    ...FONTS.caption,
    color: COLORS.textLight,
    marginBottom: 4,
    fontWeight: '500',
  },
  highlightedLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  highlightedNumber: {
    color: COLORS.text,
    fontWeight: '700',
  },
  phaseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
