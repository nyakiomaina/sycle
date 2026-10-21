export type FlowLevel = 'none' | 'light' | 'medium' | 'heavy';

export type PhaseName = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';

export type PregnancyStatus = 'not_pregnant' | 'pregnant' | 'trying' | 'postpartum' | 'prefer_not_to_say';

export type WorkoutIntensity = 'rest' | 'light' | 'moderate' | 'high' | 'max';

export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  affectsHormones: boolean;
}

export interface User {
  id: string;
  username: string;
  birthYear?: number;
  heightCm?: number;
  weightKg?: number;
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodStartDate: string;
  pregnancyStatus: PregnancyStatus;
  healthConditions: string[];
  hasConsented: boolean;
}

export interface HormoneLevel {
  name: string;
  level: 'very_low' | 'low' | 'rising' | 'moderate' | 'high' | 'peak' | 'falling';
  description: string;
}

export interface HormoneProfile {
  summary: string;
  detail: string;
  hormones: HormoneLevel[];
  fertileWindow: boolean;
  ovulationLikely: boolean;
}

export interface WorkoutGuidance {
  intensity: WorkoutIntensity;
  recommendation: string;
  why: string;
}

export interface NutritionGuidance {
  focus: string;
  keyNutrients: { nutrient: string; why: string; sources: string }[];
  hydration: string;
  avoid: string;
}

export interface PhaseContent {
  name: PhaseName;
  displayName: string;
  hormones: string;
  bodyMood: string;
  food: string;
  exercise: string;
  fasting: string;
  color: string;
  emoji: string;
}

export interface CycleLog {
  id: string;
  date: string;
  flow?: FlowLevel;
  mood?: string[];
  symptoms?: string[];
  note?: string;
}

export interface PhaseInfo {
  name: PhaseName;
  displayName: string;
  cycleDay: number;
  dayInPhase: number;
  totalPhaseDays: number;
  color: string;
  emoji: string;
}

export interface PhaseBoundaries {
  menstrual: { start: number; end: number };
  follicular: { start: number; end: number };
  ovulatory: { start: number; end: number };
  luteal: { start: number; end: number };
}

export interface FertileWindowInfo {
  isFertile: boolean;
  isOvulationDay: boolean;
  fertileStart: number;
  fertileEnd: number;
  ovulationDay: number;
  daysUntilFertile: number | null;
  daysUntilOvulation: number | null;
}
