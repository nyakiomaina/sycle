import { HealthCondition } from '../types';

export const HEALTH_CONDITIONS: HealthCondition[] = [
  {
    id: 'pcos',
    name: 'PCOS',
    description:
      'Polycystic ovary syndrome can cause irregular cycles, longer or shorter phases, and hormonal imbalances including higher androgens. Cycle tracking can still be helpful — your pattern is your pattern.',
    affectsHormones: true,
  },
  {
    id: 'fibroids',
    name: 'Fibroids',
    description:
      'Uterine fibroids can cause heavier or longer periods, cramping, and sometimes irregular bleeding between periods. They\'re very common and often manageable with the right care.',
    affectsHormones: false,
  },
  {
    id: 'endometriosis',
    name: 'Endometriosis',
    description:
      'Endometriosis can cause severe pain, heavy periods, and sometimes irregular cycles. Pain patterns may shift across your cycle — tracking can help you identify your difficult days.',
    affectsHormones: true,
  },
  {
    id: 'thyroid',
    name: 'Thyroid condition',
    description:
      'Both hypothyroidism and hyperthyroidism can affect cycle length, flow, and hormonal balance. If your thyroid medication changes, your cycle may shift temporarily.',
    affectsHormones: true,
  },
  {
    id: 'adenomyosis',
    name: 'Adenomyosis',
    description:
      'Adenomyosis can cause heavy, prolonged periods and significant cramping. It\'s sometimes found alongside endometriosis and fibroids.',
    affectsHormones: false,
  },
  {
    id: 'hormonal_bc',
    name: 'Hormonal birth control',
    description:
      'Hormonal contraceptives (pill, patch, ring, hormonal IUD, implant) alter your natural hormone patterns. Phase-based guidance may be less applicable while using them.',
    affectsHormones: true,
  },
  {
    id: 'perimenopause',
    name: 'Perimenopause',
    description:
      'The transition toward menopause brings fluctuating hormones and changing cycle patterns. Cycles may become shorter, longer, or irregular — all of this is normal.',
    affectsHormones: true,
  },
  {
    id: 'anemia',
    name: 'Anemia / iron deficiency',
    description:
      'Anemia can intensify fatigue during your period and throughout your cycle. Iron-rich foods become especially important, particularly during and after menstruation.',
    affectsHormones: false,
  },
];

export const PREGNANCY_OPTIONS: { value: string; label: string; description: string }[] = [
  { value: 'not_pregnant', label: 'Not pregnant', description: '' },
  { value: 'trying', label: 'Trying to conceive', description: 'We\'ll highlight your fertile window' },
  { value: 'pregnant', label: 'Currently pregnant', description: 'Phase tracking will pause' },
  { value: 'postpartum', label: 'Postpartum', description: 'Your cycle may still be returning' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say', description: '' },
];
