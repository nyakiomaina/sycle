import { PhaseName, WorkoutGuidance } from '../types';

export const WORKOUT_GUIDANCE: Record<PhaseName, WorkoutGuidance> = {
  menstrual: {
    intensity: 'light',
    recommendation: 'Gentle movement like walking, yoga, or stretching. Listen to your body — rest days are perfectly fine.',
    why: 'Low estrogen and progesterone mean lower energy and recovery capacity. Gentle movement supports circulation and can ease cramps without stressing your body.',
  },
  follicular: {
    intensity: 'moderate',
    recommendation: 'Strength training, cardio, dance, and group fitness. Your body is primed to build muscle and endurance.',
    why: 'Rising estrogen enhances muscle recovery and strength gains. Your cardiovascular system responds well to training now, and your social energy is also rising.',
  },
  ovulatory: {
    intensity: 'high',
    recommendation: 'HIIT, heavy lifting, sprints, and challenging workouts. This is your power window — push yourself.',
    why: 'Peak estrogen, LH surge, and a testosterone bump mean your body can handle maximum intensity. Strength, power, and endurance are all at their highest.',
  },
  luteal: {
    intensity: 'moderate',
    recommendation: 'Moderate strength training early on, transitioning to lighter movement like Pilates, walking, or swimming as your period approaches.',
    why: 'Progesterone makes recovery slower and raises your core temperature. Your caloric needs are genuinely 100-300 calories higher. Honor the shift toward rest.',
  },
};
