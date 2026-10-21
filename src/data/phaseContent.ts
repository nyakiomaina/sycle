import { PhaseContent, PhaseName } from '../types';

export const PHASE_CONTENT: Record<PhaseName, PhaseContent> = {
  menstrual: {
    name: 'menstrual',
    displayName: 'Menstrual Phase',
    hormones:
      'Estrogen and progesterone are at their lowest right now. This is why your energy may feel lower than usual — it\'s your body\'s natural rhythm, not a shortcoming.',
    bodyMood:
      'Many women feel more inward and reflective during this phase. Energy tends to be lower, and cramps or fatigue are common. Resting right now is legitimate self-care, not laziness. If you experience unusually heavy or painful periods, it\'s worth mentioning to a healthcare provider — conditions like fibroids can sometimes be behind this.',
    food:
      'Your body is losing iron, so iron-rich foods can be especially nourishing right now. Think leafy greens like callaloo or spinach, beans, lentils, or red meat and organ meats if you eat them. Pair these with vitamin C (citrus, peppers, tomatoes) to help your body absorb the iron.\n\nWarming, comforting foods tend to feel right — soups, stews, porridge. Stay well hydrated, and ginger tea may help ease cramps. If dairy doesn\'t sit well with you, warm plant-based milks work beautifully too.',
    exercise:
      'Gentle movement is your friend here — walking, restorative yoga, stretching, light mobility work. This isn\'t the time to push for personal bests. Honor what your body is telling you.',
    fasting:
      'This generally isn\'t the best phase for aggressive fasting. Your body is doing important work, and restricting fuel can add stress. If you practice intermittent fasting, consider a gentler eating window or simply eating when you\'re hungry.',
    color: '#B07A75',
    emoji: '🌙',
  },
  follicular: {
    name: 'follicular',
    displayName: 'Follicular Phase',
    hormones:
      'Estrogen is on the rise, and you may notice your energy, mood, and motivation climbing with it. Your body is preparing for ovulation, and many women feel a growing sense of optimism and creativity.',
    bodyMood:
      'This tends to be a phase where you feel more outgoing, creative, and open to new things. It\'s a natural time for planning, starting projects, and social connection. If you\'ve been waiting for the right moment to try something new, this may be it.',
    food:
      'Lighter, fresher foods tend to suit this phase well. Think fermented foods (yogurt if tolerated, fermented grains like ogi or injera), sprouted legumes, lean proteins, and plenty of colorful vegetables. Plantain, fresh fruit, and light grain bowls with millet or sorghum can feel energizing.',
    exercise:
      'Your body can handle more intensity now. Ramp up with cardio, try a new workout class, or push into progressively higher intensity. This is a great window for building strength and endurance.',
    fasting:
      'Many women find their bodies tolerate fasting better during this phase. If intermittent fasting is part of your routine, this tends to be one of the more suitable windows for it.',
    color: '#7E9E84',
    emoji: '🌱',
  },
  ovulatory: {
    name: 'ovulatory',
    displayName: 'Ovulatory Phase',
    hormones:
      'Estrogen peaks, LH surges, and there\'s a small testosterone bump. This hormonal combination often brings peak energy, confidence, and sociability. Many women feel their most vibrant during this phase.',
    bodyMood:
      'You may feel more confident, communicative, and magnetic. Energy is typically at its highest. Libido often peaks. This is a natural time for important conversations, presentations, or social events. Your body temperature may rise slightly around ovulation.',
    food:
      'Focus on anti-inflammatory and fiber-rich foods to support your liver in clearing estrogen. Load up on vegetables, fruit, and whole foods. Cruciferous vegetables (broccoli, cabbage, kale), whole grains, and fresh produce help your body process hormones efficiently. Stay hydrated — your body needs extra water around ovulation.',
    exercise:
      'This is your peak performance window. Your body can handle its hardest workouts — HIIT, heavy strength training, intense runs, challenging group classes. Channel that energy.',
    fasting:
      'Fasting is generally well tolerated during this phase. If you practice it, your body tends to handle it with relative ease right now.',
    color: '#D4A882',
    emoji: '☀️',
  },
  luteal: {
    name: 'luteal',
    displayName: 'Luteal Phase',
    hormones:
      'Progesterone rises after ovulation, then both progesterone and estrogen fall toward the end of this phase. That hormonal drop is what drives PMS symptoms for many women. Early luteal can still feel steady; late luteal is when things often shift.',
    bodyMood:
      'The first half of this phase may still feel relatively steady. As it progresses, you might notice more sensitivity, a pull toward solitude, possible irritability, or lower mood. Cravings — especially for carbs and chocolate — are common and have a real physiological basis. Your body\'s metabolic rate actually increases during this phase, so genuine hunger is normal.\n\nIf PMS symptoms are severe or significantly disrupt your life, it\'s worth discussing with a healthcare provider. Conditions like PCOS can sometimes amplify these symptoms.',
    food:
      'Complex carbohydrates are your ally here — sweet potato, yam, whole grains like millet and sorghum, brown rice. They support serotonin production, which naturally dips.\n\nMagnesium-rich foods can help with mood and cramps: dark chocolate, pumpkin seeds, leafy greens, plantain. B vitamins and calcium are also supportive.\n\nMeet your cravings with nourishing versions rather than restricting — a bowl of warm yam porridge with dark chocolate, roasted sweet potatoes, bean stew with whole grains. Easing up on caffeine, excess salt, and refined sugar may help reduce PMS symptoms for some women.',
    exercise:
      'Early luteal phase — moderate strength training and steady-state cardio still work well. As you move into late luteal, wind down to gentler movement: pilates, walking, yoga, swimming. Listen to your energy levels rather than pushing through.',
    fasting:
      'Fasting is generally not recommended in the late luteal phase. Your body\'s metabolic needs are higher, and restricting fuel during this time can raise cortisol, worsen sleep, and intensify PMS symptoms. If you practice intermittent fasting, consider pausing or widening your eating window during the last week of your cycle. Your body is asking for more fuel — honoring that is not a failure.',
    color: '#C88C79',
    emoji: '🍂',
  },
};

export const MOOD_OPTIONS = [
  'Energetic', 'Calm', 'Happy', 'Creative', 'Focused',
  'Anxious', 'Irritable', 'Sad', 'Tired', 'Sensitive',
  'Social', 'Withdrawn', 'Motivated', 'Emotional', 'Peaceful',
];

export const SYMPTOM_OPTIONS = [
  'Cramps', 'Bloating', 'Headache', 'Breast tenderness',
  'Back pain', 'Fatigue', 'Nausea', 'Acne',
  'Cravings', 'Insomnia', 'Hot flashes', 'Dizziness',
  'Joint pain', 'Digestive issues', 'Mood swings',
];

export const DISCLAIMER_TEXT =
  'This app is for education and general wellness, not medical advice. It is not a diagnostic tool and does not replace a doctor. If something feels wrong, or your cycle changes significantly, please talk to a healthcare professional. Fasting and exercise suggestions are optional — listen to your body.';
