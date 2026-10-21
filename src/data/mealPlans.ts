import { PhaseName, NutritionGuidance } from '../types';

export const NUTRITION_GUIDANCE: Record<PhaseName, NutritionGuidance> = {
  menstrual: {
    focus: 'Replenish iron, reduce inflammation, and comfort your body with warming, nutrient-dense foods.',
    keyNutrients: [
      { nutrient: 'Iron', why: 'You\'re losing iron through menstrual blood. Low iron worsens fatigue and brain fog.', sources: 'Red meat, liver, spinach, callaloo, lentils, beans, pumpkin seeds' },
      { nutrient: 'Vitamin C', why: 'Dramatically improves iron absorption when eaten alongside iron-rich foods.', sources: 'Citrus fruits, bell peppers, tomatoes, guava, baobab' },
      { nutrient: 'Omega-3s', why: 'Reduces prostaglandins, the compounds that cause cramping and inflammation.', sources: 'Salmon, sardines, mackerel, flaxseed, walnuts' },
      { nutrient: 'Magnesium', why: 'Relaxes smooth muscle (less cramping) and supports mood during the low-hormone dip.', sources: 'Dark chocolate, pumpkin seeds, spinach, plantain, black beans' },
      { nutrient: 'Zinc', why: 'Supports immune function, which dips slightly during menstruation.', sources: 'Pumpkin seeds, chickpeas, cashews, lentils, red meat' },
    ],
    hydration: 'Aim for 2-3 liters of water daily. Warm beverages like ginger tea, turmeric lattes, and bone broth are especially soothing and can help with cramps.',
    avoid: 'Excess caffeine (can worsen cramps), very salty foods (worsens bloating), refined sugar (spikes and crashes worsen fatigue), and alcohol (interferes with iron absorption and disrupts sleep).',
  },

  follicular: {
    focus: 'Light, fresh, fermented foods that support gut health and rising estrogen metabolism.',
    keyNutrients: [
      { nutrient: 'Probiotics & Fermented Foods', why: 'Support your gut microbiome in metabolizing rising estrogen through the estrobolome.', sources: 'Yogurt (if tolerated), fermented porridge (ogi), sauerkraut, kimchi, kefir' },
      { nutrient: 'B Vitamins', why: 'Support energy production as your metabolism shifts into a more active gear.', sources: 'Whole grains, eggs, legumes, leafy greens, nutritional yeast' },
      { nutrient: 'Lean Protein', why: 'Supports the muscle building your body is primed for as estrogen rises.', sources: 'Chicken, fish, eggs, lentils, sprouted beans, tofu' },
      { nutrient: 'Phytoestrogens', why: 'Help modulate estrogen receptors as your natural estrogen climbs.', sources: 'Flaxseed, sesame seeds, lentils, mung beans' },
      { nutrient: 'Vitamin E', why: 'Supports follicle development and reproductive health.', sources: 'Almonds, sunflower seeds, avocado, sweet potato' },
    ],
    hydration: 'Stay well hydrated with 2-3 liters of water. Green tea is great here — the antioxidants support estrogen metabolism. Coconut water is a good natural electrolyte source.',
    avoid: 'Heavy, greasy foods that slow digestion. Your body is building energy — keep meals lighter and fresher to match.',
  },

  ovulatory: {
    focus: 'Fiber-rich, anti-inflammatory foods that help your liver clear peak estrogen levels efficiently.',
    keyNutrients: [
      { nutrient: 'Fiber', why: 'Helps your body excrete excess estrogen through the digestive tract. Estrogen is at its highest — you need to metabolize it well.', sources: 'Cruciferous vegetables, whole grains, beans, flaxseed, fruit with skin' },
      { nutrient: 'Cruciferous Vegetables', why: 'Contain DIM and sulforaphane, which specifically support healthy estrogen metabolism in the liver.', sources: 'Broccoli, cauliflower, cabbage, kale, Brussels sprouts, bok choy' },
      { nutrient: 'Antioxidants', why: 'Combat oxidative stress that peaks around ovulation as the follicle ruptures.', sources: 'Berries, dark leafy greens, sweet potatoes, turmeric, green tea' },
      { nutrient: 'Glutathione Support', why: 'The master antioxidant — supports liver detox of excess estrogen.', sources: 'Garlic, onions, cruciferous vegetables, avocado' },
      { nutrient: 'Light Carbs', why: 'Insulin sensitivity is high around ovulation, so your body handles carbs efficiently.', sources: 'Quinoa, fruit, sweet potato, whole grains' },
    ],
    hydration: 'Increase water intake to 2.5-3+ liters — your body needs extra hydration around ovulation. Add electrolytes if you\'re training hard. Green tea supports estrogen metabolism.',
    avoid: 'Excess alcohol (stresses the liver when it\'s already working hard on estrogen), processed foods, and unnecessary added sugars.',
  },

  luteal: {
    focus: 'Complex carbs for serotonin, magnesium for mood and cramps, and extra calories to match your elevated metabolism.',
    keyNutrients: [
      { nutrient: 'Complex Carbohydrates', why: 'Serotonin drops as estrogen falls. Complex carbs boost tryptophan uptake in the brain, supporting serotonin production naturally.', sources: 'Sweet potato, yam, brown rice, oats, millet, sorghum, plantain, whole-grain bread' },
      { nutrient: 'Magnesium', why: 'Reduces PMS symptoms including cramps, mood swings, water retention, and chocolate cravings. Most women are deficient.', sources: 'Dark chocolate (70%+), pumpkin seeds, almonds, black beans, plantain, spinach' },
      { nutrient: 'Calcium', why: 'Studies show calcium supplementation reduces PMS severity by up to 48%. Critical in the luteal phase.', sources: 'Fortified plant milk, sardines with bones, sesame seeds (tahini), kale, broccoli, almonds' },
      { nutrient: 'Vitamin B6', why: 'Supports progesterone production and helps the liver process estrogen. Also helps with mood and water retention.', sources: 'Chicken, fish, potatoes, bananas, chickpeas, sunflower seeds' },
      { nutrient: 'Healthy Fats', why: 'Support hormone production and help you feel satisfied. Your body\'s caloric needs are genuinely 100-300 calories higher.', sources: 'Avocado, coconut oil, olive oil, nuts, seeds, fatty fish' },
    ],
    hydration: 'Stay hydrated to reduce bloating (counterintuitive but true — dehydration makes your body hold MORE water). Chamomile tea before bed supports sleep. Peppermint tea helps with bloating.',
    avoid: 'Excess caffeine (worsens anxiety and disrupts sleep), very salty foods (increases water retention), alcohol (depletes B vitamins and worsens mood), and refined sugar (causes blood sugar crashes that worsen irritability).',
  },
};
