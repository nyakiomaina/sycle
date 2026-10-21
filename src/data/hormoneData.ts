import { PhaseName, HormoneProfile } from '../types';

export const HORMONE_PROFILES: Record<PhaseName, HormoneProfile> = {
  menstrual: {
    summary: 'All hormones are at their lowest. Your body is shedding the uterine lining and resetting for a new cycle.',
    detail:
      'With estrogen and progesterone bottomed out, your body enters a natural recovery phase. The drop in progesterone is what triggered your period. Low estrogen means lower serotonin and dopamine — which is why energy, mood, and motivation tend to dip. This is physiological, not personal. Your body is doing important work.',
    hormones: [
      {
        name: 'Estrogen',
        level: 'very_low',
        description: 'At its lowest point of the entire cycle. Begins a slow rise toward the end of your period. Low estrogen contributes to fatigue, lower mood, and sometimes headaches.',
      },
      {
        name: 'Progesterone',
        level: 'very_low',
        description: 'Near zero — its sharp drop is what triggered menstruation. Will stay low until after ovulation.',
      },
      {
        name: 'FSH (Follicle-Stimulating Hormone)',
        level: 'rising',
        description: 'Starting to rise as your brain signals the ovaries to begin maturing new follicles for this cycle. This is the engine that drives the next phase.',
      },
      {
        name: 'LH (Luteinizing Hormone)',
        level: 'low',
        description: 'Stays low during menstruation. Will not spike until right before ovulation.',
      },
      {
        name: 'Testosterone',
        level: 'low',
        description: 'At a low baseline. May contribute to lower libido and reduced motivation during this phase.',
      },
    ],
    fertileWindow: false,
    ovulationLikely: false,
  },

  follicular: {
    summary: 'Estrogen is climbing steadily. Your body is preparing an egg for release, and you\'re likely feeling more energized and optimistic.',
    detail:
      'FSH has recruited several follicles in your ovaries, and one dominant follicle is emerging. As it grows, it produces increasing amounts of estrogen. Rising estrogen boosts serotonin and dopamine — your brain\'s feel-good chemicals — which is why mood, energy, and creativity tend to improve. Your uterine lining is thickening in preparation for a potential pregnancy.',
    hormones: [
      {
        name: 'Estrogen',
        level: 'rising',
        description: 'Climbing steadily day by day as the dominant follicle grows. This is what drives your increasing energy, better mood, clearer skin, and sharper thinking. Estrogen also supports bone density, cardiovascular health, and brain function.',
      },
      {
        name: 'Progesterone',
        level: 'low',
        description: 'Still low — progesterone only rises significantly after ovulation. Its absence means less water retention and bloating compared to the luteal phase.',
      },
      {
        name: 'FSH (Follicle-Stimulating Hormone)',
        level: 'moderate',
        description: 'Active and working — stimulating the ovaries to develop follicles. Once a dominant follicle is selected, FSH begins to taper slightly.',
      },
      {
        name: 'LH (Luteinizing Hormone)',
        level: 'low',
        description: 'Gradually building but still low. It\'s preparing for the dramatic surge that will trigger ovulation.',
      },
      {
        name: 'Testosterone',
        level: 'rising',
        description: 'Gradually increasing alongside estrogen. Contributes to rising energy, motivation, confidence, and libido as you approach ovulation.',
      },
    ],
    fertileWindow: false,
    ovulationLikely: false,
  },

  ovulatory: {
    summary: 'Estrogen peaks, LH surges, and an egg is released. This is your most fertile window and often when you feel your best.',
    detail:
      'The dominant follicle has matured, and a massive LH surge triggers ovulation — the release of an egg from the ovary. Estrogen is at its absolute peak, bringing peak energy, confidence, and sociability. There\'s also a small testosterone bump that boosts libido and assertiveness. After the egg is released, estrogen dips briefly before rising again in the luteal phase. Your basal body temperature rises slightly (0.2-0.5°C) after ovulation due to the start of progesterone production.',
    hormones: [
      {
        name: 'Estrogen',
        level: 'peak',
        description: 'At its highest point of the cycle, then drops briefly after ovulation. Peak estrogen brings peak verbal fluency, social energy, skin glow, and positive mood. It also makes cervical mucus clear and stretchy (egg-white consistency) to facilitate conception.',
      },
      {
        name: 'Progesterone',
        level: 'rising',
        description: 'Begins to rise immediately after the egg is released, as the empty follicle transforms into the corpus luteum. You may notice your body temperature tick up slightly.',
      },
      {
        name: 'FSH (Follicle-Stimulating Hormone)',
        level: 'high',
        description: 'Briefly peaks alongside LH to support the final maturation and release of the egg, then drops rapidly.',
      },
      {
        name: 'LH (Luteinizing Hormone)',
        level: 'peak',
        description: 'The LH surge is the main trigger for ovulation. It rises dramatically 24-36 hours before the egg is released. This is what ovulation test strips detect.',
      },
      {
        name: 'Testosterone',
        level: 'peak',
        description: 'Hits its cycle high around ovulation. Drives increased libido, confidence, assertiveness, and physical performance. This is evolutionarily timed — your body\'s way of encouraging reproduction.',
      },
    ],
    fertileWindow: true,
    ovulationLikely: true,
  },

  luteal: {
    summary: 'Progesterone dominates as your body prepares for a potential pregnancy. Energy and mood gradually shift inward.',
    detail:
      'After ovulation, the empty follicle becomes the corpus luteum, a temporary gland that produces large amounts of progesterone. Progesterone is a calming, warming hormone — it raises body temperature, promotes sleep, and prepares the uterine lining. Estrogen rises again in mid-luteal before both hormones drop sharply if pregnancy doesn\'t occur. That hormonal drop in late luteal is what causes PMS. Your metabolic rate increases by roughly 100-300 calories per day, which is why hunger and cravings intensify — your body genuinely needs more fuel.',
    hormones: [
      {
        name: 'Estrogen',
        level: 'moderate',
        description: 'Rises again in mid-luteal phase (a secondary, smaller peak), then falls sharply in the final days before your period. The sharp drop in late luteal contributes to mood swings, headaches, and emotional sensitivity.',
      },
      {
        name: 'Progesterone',
        level: 'high',
        description: 'The dominant hormone of this phase. Peaks around day 21 of a 28-day cycle (roughly 7 days after ovulation). Promotes calm, sleep, and appetite. Can also cause bloating, breast tenderness, and constipation. Its sharp drop at the end triggers your period.',
      },
      {
        name: 'FSH (Follicle-Stimulating Hormone)',
        level: 'low',
        description: 'Suppressed by high progesterone and estrogen levels — the body is signaling that no new follicle development is needed right now.',
      },
      {
        name: 'LH (Luteinizing Hormone)',
        level: 'low',
        description: 'Returns to low baseline after the ovulatory surge. Stays low throughout the luteal phase.',
      },
      {
        name: 'Testosterone',
        level: 'falling',
        description: 'Decreases from its ovulatory peak. Lower testosterone, combined with the calming effect of progesterone, may reduce motivation and drive compared to the ovulatory phase.',
      },
    ],
    fertileWindow: false,
    ovulationLikely: false,
  },
};
