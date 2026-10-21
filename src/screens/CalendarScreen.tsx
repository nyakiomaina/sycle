import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { useApp } from '../context/AppContext';
import { getPhaseForDate } from '../utils/phaseEngine';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS } from '../utils/theme';
import type { PhaseName } from '../types';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const PHASE_BG: Record<PhaseName, string> = {
  menstrual: COLORS.menstrualFaint,
  follicular: COLORS.follicularFaint,
  ovulatory: COLORS.ovulatoryFaint,
  luteal: COLORS.lutealFaint,
};

const PHASE_LABEL: Record<PhaseName, string> = {
  menstrual: 'Menstrual',
  follicular: 'Follicular',
  ovulatory: 'Ovulatory',
  luteal: 'Luteal',
};

const PHASE_DOT: Record<PhaseName, string> = {
  menstrual: COLORS.menstrual,
  follicular: COLORS.follicular,
  ovulatory: COLORS.ovulatory,
  luteal: COLORS.luteal,
};

export default function CalendarScreen() {
  const { user } = useApp();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));

  const goToPrev = useCallback(() => setCurrentMonth((m) => subMonths(m, 1)), []);
  const goToNext = useCallback(() => setCurrentMonth((m) => addMonths(m, 1)), []);
  const goToToday = useCallback(() => setCurrentMonth(startOfMonth(new Date())), []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const weeks: Date[][] = [];
  let day = calStart;
  while (day <= calEnd) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Calendar</Text>

      <View style={styles.monthNav}>
        <TouchableOpacity onPress={goToPrev} style={styles.navButton} activeOpacity={0.6}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToToday} activeOpacity={0.7}>
          <Text style={styles.monthLabel}>{format(currentMonth, 'MMMM yyyy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNext} style={styles.navButton} activeOpacity={0.6}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.weekdayRow}>
          {WEEKDAYS.map((d, i) => (
            <View key={i} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{d}</Text>
            </View>
          ))}
        </View>

        {weeks.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((date) => {
              const inMonth = isSameMonth(date, currentMonth);
              const isToday = isSameDay(date, today);
              let phase: PhaseName | null = null;
              let phaseBg = 'transparent';

              if (user && inMonth) {
                const info = getPhaseForDate(
                  user.lastPeriodStartDate,
                  user.averageCycleLength,
                  user.averagePeriodLength,
                  date
                );
                phase = info.name;
                phaseBg = PHASE_BG[phase];
              }

              return (
                <View key={date.toISOString()} style={styles.dayCell}>
                  <View
                    style={[
                      styles.dayCircle,
                      inMonth && { backgroundColor: phaseBg },
                      isToday && styles.todayCircle,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !inMonth && styles.dayTextOutside,
                        isToday && styles.todayText,
                      ]}
                    >
                      {format(date, 'd')}
                    </Text>
                  </View>
                  {phase && inMonth && (
                    <View style={[styles.phaseDot, { backgroundColor: PHASE_DOT[phase] }]} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        {(['menstrual', 'follicular', 'ovulatory', 'luteal'] as PhaseName[]).map((p) => (
          <View key={p} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: PHASE_DOT[p] }]} />
            <Text style={styles.legendText}>{PHASE_LABEL[p]}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  title: {
    ...FONTS.headingLarge,
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  navArrow: {
    fontSize: 24,
    color: COLORS.primary,
    lineHeight: 26,
  },
  monthLabel: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 20,
    color: COLORS.text,
  },
  calendarCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: SPACING.xs,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  weekdayText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  dayTextOutside: {
    color: COLORS.borderLight,
  },
  todayText: {
    color: COLORS.textOnPrimary,
    fontWeight: '700',
  },
  phaseDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...FONTS.small,
    fontSize: 13,
  },
});
