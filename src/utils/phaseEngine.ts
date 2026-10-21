import { differenceInDays, parseISO } from 'date-fns';
import { PhaseName, PhaseInfo, PhaseBoundaries, FertileWindowInfo } from '../types';

const PHASE_COLORS: Record<PhaseName, string> = {
  menstrual: '#B07A75',
  follicular: '#7E9E84',
  ovulatory: '#D4A882',
  luteal: '#C88C79',
};

const PHASE_EMOJIS: Record<PhaseName, string> = {
  menstrual: '🌙',
  follicular: '🌱',
  ovulatory: '☀️',
  luteal: '🍂',
};

const PHASE_DISPLAY_NAMES: Record<PhaseName, string> = {
  menstrual: 'Menstrual',
  follicular: 'Follicular',
  ovulatory: 'Ovulatory',
  luteal: 'Luteal',
};

export function computePhaseBoundaries(
  cycleLength: number,
  periodLength: number
): PhaseBoundaries {
  const ovulationDay = cycleLength - 14;
  const ovulationHalfWindow = Math.round(cycleLength * (5 / 28) / 2);
  const ovulatoryStart = Math.max(periodLength + 1, ovulationDay - ovulationHalfWindow + 1);
  const ovulatoryEnd = Math.min(cycleLength, ovulationDay + ovulationHalfWindow);

  return {
    menstrual: { start: 1, end: periodLength },
    follicular: { start: periodLength + 1, end: ovulatoryStart - 1 },
    ovulatory: { start: ovulatoryStart, end: ovulatoryEnd },
    luteal: { start: ovulatoryEnd + 1, end: cycleLength },
  };
}

export function getCycleDay(
  lastPeriodStartDate: string,
  cycleLength: number,
  targetDate: Date = new Date()
): number {
  const startDate = parseISO(lastPeriodStartDate);
  const daysDiff = differenceInDays(targetDate, startDate);
  const cycleDay = ((daysDiff % cycleLength) + cycleLength) % cycleLength + 1;
  return cycleDay;
}

export function getPhaseForDay(
  cycleDay: number,
  cycleLength: number,
  periodLength: number
): PhaseInfo {
  const boundaries = computePhaseBoundaries(cycleLength, periodLength);

  let phaseName: PhaseName;
  let dayInPhase: number;
  let totalPhaseDays: number;

  if (cycleDay >= boundaries.menstrual.start && cycleDay <= boundaries.menstrual.end) {
    phaseName = 'menstrual';
    dayInPhase = cycleDay - boundaries.menstrual.start + 1;
    totalPhaseDays = boundaries.menstrual.end - boundaries.menstrual.start + 1;
  } else if (cycleDay >= boundaries.follicular.start && cycleDay <= boundaries.follicular.end) {
    phaseName = 'follicular';
    dayInPhase = cycleDay - boundaries.follicular.start + 1;
    totalPhaseDays = boundaries.follicular.end - boundaries.follicular.start + 1;
  } else if (cycleDay >= boundaries.ovulatory.start && cycleDay <= boundaries.ovulatory.end) {
    phaseName = 'ovulatory';
    dayInPhase = cycleDay - boundaries.ovulatory.start + 1;
    totalPhaseDays = boundaries.ovulatory.end - boundaries.ovulatory.start + 1;
  } else {
    phaseName = 'luteal';
    dayInPhase = cycleDay - boundaries.luteal.start + 1;
    totalPhaseDays = boundaries.luteal.end - boundaries.luteal.start + 1;
  }

  return {
    name: phaseName,
    displayName: PHASE_DISPLAY_NAMES[phaseName],
    cycleDay,
    dayInPhase,
    totalPhaseDays,
    color: PHASE_COLORS[phaseName],
    emoji: PHASE_EMOJIS[phaseName],
  };
}

export function isLateLuteal(
  cycleDay: number,
  cycleLength: number,
  periodLength: number
): boolean {
  const boundaries = computePhaseBoundaries(cycleLength, periodLength);
  if (cycleDay < boundaries.luteal.start || cycleDay > boundaries.luteal.end) return false;
  const lutealLength = boundaries.luteal.end - boundaries.luteal.start + 1;
  const dayInLuteal = cycleDay - boundaries.luteal.start + 1;
  return dayInLuteal > Math.floor(lutealLength / 2);
}

export function getPhaseForDate(
  lastPeriodStartDate: string,
  cycleLength: number,
  periodLength: number,
  targetDate: Date = new Date()
): PhaseInfo {
  const cycleDay = getCycleDay(lastPeriodStartDate, cycleLength, targetDate);
  return getPhaseForDay(cycleDay, cycleLength, periodLength);
}

export function getFertileWindow(
  cycleDay: number,
  cycleLength: number
): FertileWindowInfo {
  const ovulationDay = cycleLength - 14;
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  const isFertile = cycleDay >= fertileStart && cycleDay <= fertileEnd;
  const isOvulationDay = cycleDay === ovulationDay;

  let daysUntilFertile: number | null = null;
  let daysUntilOvulation: number | null = null;

  if (cycleDay < fertileStart) {
    daysUntilFertile = fertileStart - cycleDay;
    daysUntilOvulation = ovulationDay - cycleDay;
  } else if (cycleDay <= ovulationDay) {
    daysUntilFertile = 0;
    daysUntilOvulation = ovulationDay - cycleDay;
  }

  return {
    isFertile,
    isOvulationDay,
    fertileStart,
    fertileEnd,
    ovulationDay,
    daysUntilFertile,
    daysUntilOvulation,
  };
}

export function getNextPeriodDate(
  lastPeriodStartDate: string,
  cycleLength: number
): Date {
  const start = parseISO(lastPeriodStartDate);
  const today = new Date();
  const daysDiff = differenceInDays(today, start);
  const cyclesElapsed = Math.floor(daysDiff / cycleLength);
  const nextStart = new Date(start);
  nextStart.setDate(nextStart.getDate() + (cyclesElapsed + 1) * cycleLength);
  return nextStart;
}

export { PHASE_COLORS, PHASE_EMOJIS, PHASE_DISPLAY_NAMES };
