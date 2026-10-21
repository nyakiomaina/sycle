import type { PhaseName, WorkoutIntensity } from '../types';

export interface PhaseInsightData {
  tagline: string;
  superpowers: { name: string; detail: string }[];
  bodySignals: { signal: string; why: string }[];
  dailyInsights: string[];
  energy: { level: string; description: string };
  brain: string;
  social: string;
  sleep: string;
  skin: string;
  metabolism: string;
  selfCare: string[];
  movement: {
    intensity: WorkoutIntensity;
    types: string[];
    why: string;
    caution?: string;
  };
}

export const PHASE_INSIGHTS: Record<PhaseName, PhaseInsightData> = {
  menstrual: {
    tagline: 'Your inner winter. Time to rest, reflect, and let your body reset.',
    superpowers: [
      { name: 'Intuition', detail: 'Both brain hemispheres communicate more equally during menstruation, strengthening intuition and big-picture thinking.' },
      { name: 'Evaluation', detail: 'You naturally see what\'s working and what isn\'t. Use this clarity to make honest assessments about your life and goals.' },
      { name: 'Reflection', detail: 'Lower social drive creates space for deep inner work. Journaling, meditation, and quiet thinking are uniquely powerful now.' },
    ],
    bodySignals: [
      { signal: 'Cramps', why: 'Prostaglandins contract your uterus to shed the lining. Anti-inflammatory foods (omega-3s, ginger, turmeric) directly reduce prostaglandin production.' },
      { signal: 'Fatigue', why: 'Estrogen, progesterone, and serotonin are all at their lowest. Your body is doing significant physical work. Rest is not laziness — it\'s recovery.' },
      { signal: 'Mood dips', why: 'Serotonin drops alongside estrogen. This is neurochemistry, not weakness. Magnesium and complex carbs support serotonin production.' },
      { signal: 'Bloating', why: 'Prostaglandins can affect your bowels too, causing water retention and digestive changes. Staying hydrated counterintuitively helps.' },
      { signal: 'Lower back pain', why: 'Prostaglandins cause smooth muscle contraction beyond just the uterus. Gentle stretching, heat, and magnesium help relax these muscles.' },
    ],
    dailyInsights: [
      'Your body is shedding and rebuilding. Hormones are at their lowest — rest isn\'t optional, it\'s what your biology is asking for.',
      'Iron levels drop with each day of bleeding. Pair iron-rich foods with vitamin C — your body absorbs up to 6x more iron this way.',
      'Prostaglandins peak early in your period, driving cramps. Omega-3 fatty acids directly compete with the pathways that produce them.',
      'Both brain hemispheres communicate more equally right now. Your intuition and evaluative thinking are unusually strong.',
      'This is your body\'s natural reset. What you rest through now becomes the energy you draw from for the rest of your cycle.',
    ],
    energy: { level: 'Low', description: 'Your body is using significant energy to shed the uterine lining. Energy levels are at their cycle low, especially days 1-3.' },
    brain: 'Both hemispheres communicate more equally, enhancing intuition and whole-brain thinking. Your analytical and creative sides work in closer harmony. Use this for reflection and honest evaluation.',
    social: 'Social energy is at its lowest. You may prefer solitude or small, intimate gatherings. This is normal — honor it. Cancel plans if you need to without guilt.',
    sleep: 'Melatonin production may be disrupted by low estrogen. Magnesium glycinate before bed supports both sleep and cramp relief. Keep your bedroom cool — even though you may feel cold, cooler temps improve sleep quality.',
    skin: 'Hormone levels bottom out, which can cause dullness or dryness. Be gentle with your skin — skip harsh exfoliants and actives. Focus on hydration and barrier support.',
    metabolism: 'Basal metabolic rate is at its lowest. You may notice decreased appetite — that\'s normal. Don\'t force large meals. Eat warming, nutrient-dense foods when you\'re hungry.',
    selfCare: [
      'Apply heat to your lower abdomen — it\'s as effective as ibuprofen for cramp relief in clinical studies.',
      'Take a warm bath with magnesium salts. Your body absorbs magnesium through skin, easing both muscles and mood.',
      'Say no to commitments that drain you. Your social battery is at its smallest — protect it.',
      'Journal or reflect. Your evaluative thinking is sharp now — insights that come during menstruation often prove accurate.',
    ],
    movement: {
      intensity: 'light',
      types: ['Restorative yoga', 'Gentle walking', 'Stretching', 'Light swimming'],
      why: 'Low estrogen and progesterone mean reduced energy and slower recovery. Gentle movement supports blood flow and can ease cramps without depleting your already-low reserves.',
      caution: 'Skip intense workouts — your body is doing significant physical work already. Pushing hard now increases injury risk and cortisol without the hormonal support to recover well.',
    },
  },

  follicular: {
    tagline: 'Your inner spring. Energy is building, creativity is rising, everything feels possible.',
    superpowers: [
      { name: 'Creativity', detail: 'Rising estrogen boosts dopamine and serotonin, making you more imaginative, curious, and open to new ideas. Start new projects now.' },
      { name: 'Verbal fluency', detail: 'Estrogen directly enhances the brain\'s language centers. You\'re more articulate, persuasive, and quick with words.' },
      { name: 'Learning', detail: 'Hippocampal activity increases with estrogen, making it easier to absorb and retain new information. Study, read, take courses.' },
      { name: 'Optimism', detail: 'Rising estrogen and serotonin create a natural mood lift. You\'re more resilient to stress and more likely to see possibilities.' },
    ],
    bodySignals: [
      { signal: 'Rising energy', why: 'Estrogen is climbing steadily, boosting serotonin, dopamine, and overall vitality. You may notice you\'re waking up earlier and feeling more motivated.' },
      { signal: 'Better mood', why: 'Estrogen is a natural antidepressant — it enhances serotonin receptor sensitivity. The mood lift you feel is real brain chemistry.' },
      { signal: 'Clearer skin', why: 'Estrogen promotes collagen production and keeps sebum in check. Many people notice their clearest skin during this phase.' },
      { signal: 'Increased appetite for novelty', why: 'Dopamine rises with estrogen, creating that "I want to try something new" feeling. Channel it — new workouts, recipes, projects.' },
    ],
    dailyInsights: [
      'Estrogen is climbing steadily, and with it your energy, creativity, and optimism. This is your brain\'s spring — plant seeds for what you want to grow.',
      'Your verbal skills are sharpening daily as estrogen rises. Schedule important conversations, presentations, or writing projects now.',
      'Insulin sensitivity is strong, meaning your body handles carbs efficiently. Fresh, lighter meals match your rising energy perfectly.',
      'Your gut microbiome is metabolizing estrogen through the estrobolome. Fermented foods (ogi, kefir, sauerkraut) support this crucial process.',
      'Rising dopamine makes this the ideal time to start new habits. Your brain is primed to find motivation and stick with new routines.',
      'Social energy is building. You\'re naturally becoming more magnetic and communicative — lean into collaboration and connection.',
    ],
    energy: { level: 'Building', description: 'Energy increases steadily throughout this phase as estrogen rises. By the end, you\'ll feel noticeably more vital than during menstruation.' },
    brain: 'Rising estrogen enhances your brain\'s language centers, memory formation, and creative thinking. You learn faster, speak more fluently, and generate ideas more easily. This is your cognitive spring.',
    social: 'You\'re naturally becoming more extroverted. Social situations feel easier, communication flows better, and you may find yourself wanting to make plans and connect with people.',
    sleep: 'Sleep quality tends to be at its best during the follicular phase. Estrogen supports healthy sleep architecture. Take advantage — good sleep now builds resilience for later.',
    skin: 'Estrogen is your skin\'s best friend. It promotes collagen, controls oil, and gives you that natural glow. This is a good time to try new skincare products since your skin is most resilient.',
    metabolism: 'Insulin sensitivity is strong — your body processes carbohydrates efficiently. Lighter, fresher meals with lean protein match your rising energy state.',
    selfCare: [
      'Start something new. Your brain is primed for novelty — a new skill, workout routine, or creative project will feel exciting rather than daunting.',
      'Schedule important conversations. Your verbal fluency peaks as estrogen rises — negotiations, presentations, and difficult discussions go better now.',
      'Try new foods and recipes. Your palate may be more adventurous and your digestion is working well.',
      'Socialize. Your communication skills and charisma are building — coffee dates, networking, and collaboration feel natural.',
    ],
    movement: {
      intensity: 'moderate',
      types: ['Strength training', 'Cardio', 'Dance', 'Group fitness', 'Trying new activities'],
      why: 'Rising estrogen enhances muscle protein synthesis and recovery speed. Your body is primed to build strength and endurance — this is when training adaptations happen fastest.',
    },
  },

  ovulatory: {
    tagline: 'Your inner summer. Peak energy, confidence, and magnetism. This is your power window.',
    superpowers: [
      { name: 'Communication', detail: 'Verbal fluency hits its cycle peak. You\'re at your most articulate, persuasive, and charismatic. Give the presentation. Have the conversation.' },
      { name: 'Confidence', detail: 'Peak estrogen plus a testosterone bump creates natural confidence. You may notice you feel more assertive and self-assured.' },
      { name: 'Physical power', detail: 'Strength, endurance, and pain tolerance all peak around ovulation. This is when PRs happen.' },
      { name: 'Magnetism', detail: 'Research shows people perceive women as more attractive around ovulation — subtle changes in voice, skin, and body language. You literally glow.' },
    ],
    bodySignals: [
      { signal: 'Peak energy', why: 'Estrogen, testosterone, and LH are all elevated. This hormonal cocktail creates your highest energy state of the entire cycle.' },
      { signal: 'Cervical mucus changes', why: 'You may notice clear, stretchy discharge. This is cervical mucus becoming sperm-friendly — a reliable sign of peak fertility.' },
      { signal: 'Slight temperature rise', why: 'After the egg releases, progesterone begins to rise, elevating your basal body temperature by 0.3-0.5°C.' },
      { signal: 'Heightened senses', why: 'Research shows olfactory sensitivity increases around ovulation. You may notice scents more strongly.' },
      { signal: 'Ovulation pain', why: 'About 20% of people feel a twinge or ache on one side (mittelschmerz). It\'s the follicle rupturing to release the egg.' },
      { signal: 'Increased libido', why: 'The testosterone bump around ovulation naturally increases sexual desire. This is your body\'s biological drive at work.' },
    ],
    dailyInsights: [
      'Your hormones are at their peak performance. Estrogen, testosterone, and LH converge to give you maximum energy, confidence, and capability.',
      'Pain tolerance peaks around ovulation. If you\'ve been putting off something uncomfortable — dentist, waxing, tough workout — now\'s the time.',
      'Your voice actually changes around ovulation. Research shows it\'s perceived as more attractive. Your communication skills are at their absolute peak.',
      'Your immune system slightly suppresses to not attack a potential embryo. You may be more susceptible to infections — wash hands, prioritize sleep.',
      'Ligament laxity increases with peak estrogen. Warm up thoroughly before intense exercise — ACL injury risk is 3-6x higher around ovulation.',
      'Your metabolism is highly efficient right now. Fiber-rich foods help your liver clear the peak estrogen levels — cruciferous vegetables are your allies.',
    ],
    energy: { level: 'Peak', description: 'This is your energetic summit. Estrogen, testosterone, and LH create your highest sustained energy of the entire cycle. Use it.' },
    brain: 'Verbal fluency and social cognition peak. Your working memory is sharp, you process social cues faster, and you communicate with unusual clarity and charisma. Schedule anything that requires persuasion or presence.',
    social: 'You\'re at your most magnetic and socially confident. People respond to you more positively — this is backed by research. Schedule first dates, important meetings, presentations, and negotiations.',
    sleep: 'The LH surge can cause slightly lighter sleep. You may feel wired with energy. Channel it productively during the day so you can wind down at night.',
    skin: 'Estrogen-driven collagen production peaks, giving you the "ovulation glow." Your skin looks its plumpest and most radiant. Great time for photos.',
    metabolism: 'Insulin sensitivity is at its best. Your body handles carbohydrates beautifully and your liver is working hard to metabolize peak estrogen. Support it with cruciferous vegetables and fiber.',
    selfCare: [
      'This is your power window. Schedule the job interview, the pitch meeting, the difficult conversation. Your confidence and articulation are at their peak.',
      'Go for the PR. Your strength, endurance, and pain tolerance are all maximal. Push yourself in workouts you wouldn\'t attempt in other phases.',
      'Be mindful of injury risk. Peak estrogen increases ligament laxity — warm up thoroughly, especially before sports with cutting or pivoting.',
      'Protect your immune system. It slightly suppresses around ovulation. Prioritize sleep and hygiene even though you feel invincible.',
    ],
    movement: {
      intensity: 'high',
      types: ['HIIT', 'Heavy lifting', 'Sprints', 'Competitive sports', 'Challenging classes'],
      why: 'Peak estrogen and testosterone mean maximum strength, power, and endurance. Your VO2 max peaks and muscle protein synthesis is at its highest. This is when fitness gains are biggest.',
      caution: 'Ligament laxity increases with high estrogen, raising ACL injury risk 3-6x. Thorough warm-ups and good form matter more now than ever.',
    },
  },

  luteal: {
    tagline: 'Your inner autumn. Shifting toward detail work, nesting, and preparation.',
    superpowers: [
      { name: 'Detail orientation', detail: 'As estrogen falls and progesterone rises, your brain shifts from big-picture to detail-focused thinking. Editing, organizing, and refining come naturally.' },
      { name: 'Task completion', detail: 'The nesting instinct isn\'t just about homes — you\'re driven to complete, organize, and tie up loose ends in all areas of life.' },
      { name: 'Spatial reasoning', detail: 'Research shows spatial awareness and analytical thinking improve in the luteal phase. Good for design, planning, and problem-solving.' },
      { name: 'Pattern recognition', detail: 'Your brain becomes better at spotting inconsistencies and errors. Quality control, proofreading, and debugging are enhanced.' },
    ],
    bodySignals: [
      { signal: 'Food cravings', why: 'Your metabolic rate rises 100-300 calories. Carb cravings are your body requesting tryptophan for serotonin production as estrogen (and serotonin) drops. This is intelligent hunger, not weakness.' },
      { signal: 'Bloating', why: 'Progesterone relaxes smooth muscle, including your digestive tract, slowing motility. Smaller meals, hydration, and magnesium help.' },
      { signal: 'Breast tenderness', why: 'Progesterone causes breast tissue to retain fluid and expand slightly. This is one of the most common luteal symptoms.' },
      { signal: 'Mood shifts', why: 'Serotonin drops as estrogen falls. Irritability, anxiety, and sadness are neurochemical — B6, magnesium, and complex carbs directly support serotonin.' },
      { signal: 'Feeling warmer', why: 'Progesterone raises your core body temperature by 0.3-0.5°C. You\'re not imagining it — you really are hotter. This can disrupt sleep.' },
      { signal: 'Lower alcohol tolerance', why: 'Progesterone slows the liver enzymes that metabolize alcohol. One drink may feel like two. Go easier or skip it entirely.' },
    ],
    dailyInsights: [
      'Your metabolic rate is genuinely 100-300 calories higher. Those cravings aren\'t weakness — they\'re your body asking for the fuel it needs. Eat.',
      'Progesterone is a natural anxiolytic (anti-anxiety) AND sedative. The calm you feel early in this phase is real. Let it carry you into restful evenings.',
      'Your brain is shifting to detail mode. This is when to edit the draft, organize the closet, review the budget. Detailed work feels satisfying now.',
      'Serotonin drops as estrogen falls. Complex carbs directly boost serotonin by increasing tryptophan uptake. Sweet potato, oats, and plantain are medicine.',
      'Your core temperature is elevated. Sleep with lighter covers, keep your room cool (18-19°C), and consider a cool shower before bed.',
      'Alcohol hits harder in the luteal phase — your liver processes it more slowly. If you drink, go lighter than usual and hydrate more.',
    ],
    energy: { level: 'Declining', description: 'Early luteal energy is moderate — you can still train and work hard. But as you approach your period, energy gradually decreases. Honor the downshift.' },
    brain: 'Your thinking shifts from big-picture to detail-oriented. Editing, organizing, proofreading, and analytical work feel more natural. Spatial reasoning actually improves. Use this phase to refine and complete rather than brainstorm.',
    social: 'You\'re naturally becoming more introverted. Social obligations may feel heavier. You might be more direct or irritable — that\'s dropping serotonin, not a character flaw. Set boundaries.',
    sleep: 'Progesterone is sedating (it enhances GABA receptors), so you may feel sleepier. But elevated body temperature can disrupt sleep quality. Keep your room cool, avoid screens, and consider chamomile tea.',
    skin: 'Progesterone increases sebum production, which can lead to breakouts, especially along the jawline and chin. Gentle, non-stripping cleansers and spot treatments are your friends.',
    metabolism: 'Your basal metabolic rate increases by 100-300 calories. Your body NEEDS more food — especially complex carbohydrates. Restricting calories in the luteal phase fights your biology and worsens PMS symptoms.',
    selfCare: [
      'Eat more — seriously. Your body burns more fuel in this phase. Restricting now increases cortisol, worsens PMS, and fights a battle you can\'t win.',
      'Choose complex carbs for the serotonin boost: sweet potato, yam, plantain, oats, millet. These directly support the neurotransmitters dropping with estrogen.',
      'Schedule less. Your social battery is shrinking. This isn\'t depression — it\'s a natural shift toward inwardness that has value.',
      'Move gently as your period approaches. Light exercise improves mood and reduces PMS, but high-intensity work increases cortisol when your recovery capacity is lower.',
      'Dark chocolate (70%+) delivers magnesium AND triggers endorphin release. It\'s not a guilty pleasure — it\'s phase-appropriate self-care.',
    ],
    movement: {
      intensity: 'moderate',
      types: ['Moderate strength training', 'Pilates', 'Walking', 'Swimming', 'Yoga'],
      why: 'Progesterone slows recovery and raises body temperature. Early luteal, you can still push moderately. As your period approaches, transition to lighter, more restorative movement.',
      caution: 'Your core temperature is elevated, making you overheat faster. Stay hydrated, avoid extreme heat, and don\'t push through if you feel dizzy or excessively fatigued.',
    },
  },
};

export const CYCLE_FACTS: string[] = [
  'Your resting metabolic rate increases by 100-300 calories in the luteal phase. Those cravings aren\'t weakness — your body literally needs more fuel.',
  'Women\'s ACL injury risk increases 3-6x around ovulation due to estrogen\'s effect on ligament laxity. If you play sports, extra warm-ups matter mid-cycle.',
  'Your voice measurably changes across your cycle. Research shows it\'s perceived as more attractive around ovulation.',
  'Estrogen is a natural antidepressant. The mood dip before your period isn\'t "all in your head" — it\'s a real neurochemical shift as estrogen drops.',
  'Your immune system slightly suppresses around ovulation to avoid attacking sperm. You may be more susceptible to colds and infections mid-cycle.',
  'Progesterone raises your core body temperature by 0.3-0.5°C in the luteal phase. You\'re not imagining it — you really are warmer.',
  'Pain tolerance peaks around ovulation. Schedule dental work, waxing, or other uncomfortable procedures mid-cycle when you can.',
  'Alcohol affects you more in the luteal phase. Progesterone slows the liver enzymes that metabolize it — one drink can feel like two.',
  'Both brain hemispheres communicate more equally during menstruation, which is why intuitive insights and honest evaluations come more easily.',
  'Verbal fluency peaks around ovulation. If you have a presentation or negotiation, scheduling it mid-cycle gives you a real cognitive advantage.',
  'Your gut microbiome helps metabolize estrogen through a collection of bacteria called the estrobolome. Fermented foods directly support this process.',
  'Progesterone enhances your brain\'s GABA receptors — the same ones targeted by anti-anxiety medication. Natural calm in the early luteal phase is real.',
  'The "nesting instinct" in the luteal phase isn\'t just about homes — your brain naturally shifts to organizing, completing, and refining in all areas.',
  'Women\'s spatial reasoning and pattern recognition actually improve in the luteal phase. Detail work and debugging come more naturally.',
  'Magnesium is involved in over 300 biochemical reactions. Most women are deficient, and it directly reduces cramps, anxiety, and sleep problems.',
  'Serotonin drops as estrogen falls in the luteal phase. Complex carbs boost serotonin by increasing tryptophan uptake — those carb cravings are your brain asking for precursors.',
  'The follicular phase is when fitness adaptations happen fastest. Strength gains, muscle building, and cardiovascular improvements are all enhanced by rising estrogen.',
  'Estrogen promotes collagen production, which is why your skin looks its best mid-cycle. The "ovulation glow" is a real, measurable phenomenon.',
  'Intermittent fasting can increase cortisol in women, especially in the luteal phase. Many women find cycle-synced eating windows more sustainable than rigid fasting protocols.',
  'Your cervical mucus changes are one of the most reliable fertility signs. Clear, stretchy mucus near ovulation indicates peak fertility.',
  'Progesterone slows your digestive tract by relaxing smooth muscle. Luteal-phase bloating is biomechanical, not something you\'re doing wrong.',
  'Iron needs increase by 50% during menstruation. Vitamin C consumed alongside iron-rich foods can boost absorption by up to 600%.',
  'Fibroids affect up to 70-80% of women by age 50, with higher prevalence in women of African descent. Cycle syncing doesn\'t treat fibroids but can help manage symptoms.',
  'Your workout performance can vary by up to 20% across your cycle. Training with your hormones, not against them, is how elite female athletes optimize.',
  'Rising estrogen in the follicular phase makes you more resilient to stress. New challenges feel more manageable — it\'s not just confidence, it\'s neurochemistry.',
];
