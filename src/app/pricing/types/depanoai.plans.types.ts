import { DepanoAIPlan } from '../models/plans.model';

export const MONTHLY_PLANS: DepanoAIPlan[] = [
  {
    planCode: 'DEPANO_MONTHLY_STARTER',
    name: 'Starter Plan',
    icon: '🧵',
    originalPrice: '1299',
    discountedPrice: '949',
    credits: 80,
    description:
      'Perfect for students and independent designers exploring new ideas and experimenting with styles.',
    features: [
      'Access to all design generation & editing features',
      'Fast processing',
      'Ideal for light usage',
    ],
    popular: false,
  },
  {
    planCode: 'DEPANO_MONTHLY_DESIGNER',
    name: 'Designer Plan',
    icon: '👗',
    originalPrice: '2,799',
    discountedPrice: '2,099',
    credits: 200,
    description:
      'Best for freelance designers and growing teams who need more creative bandwidth.',
    features: [
      'All Starter features',
      'Priority design generation',
      'Ideal for regular usage',
    ],
    popular: true,
  },
  {
    planCode: 'DEPANO_MONTHLY_STUDIO',
    name: 'Studio Plan',
    icon: '🏢',
    originalPrice: '5,499',
    discountedPrice: '4,499',
    credits: 500,
    description:
      'Designed for fashion houses and power users who need scale and efficiency.',
    features: [
      'All Designer features',
      'Priority support',
      'Ideal for heavy usage',
    ],
    popular: false,
  },
];

export const ANNUAL_PLANS: DepanoAIPlan[] = [
  {
    planCode: 'DEPANO_ANNUAL_STARTER',
    name: 'Starter Plan',
    icon: '🧵',
    originalPrice: '12,999',
    discountedPrice: '9,999',
    credits: 1000,
    description:
      'Best for beginners who want a full year of creative support with predictable value.',
    features: [
      'Annual access to all editing features',
      'Better value for long-term users',
      'Ideal for steady, consistent use',
    ],
    popular: false,
  },
  {
    planCode: 'DEPANO_ANNUAL_DESIGNER',
    name: 'Designer Plan',
    icon: '👗',
    originalPrice: '27,999',
    discountedPrice: '21,999',
    credits: 2500,
    description:
      'Perfect for freelance designers and teams who want premium annual savings.',
    features: [
      'All Starter Yearly features',
      'Priority processing',
      'Higher annual credit allowance',
    ],
    popular: true,
  },
  {
    planCode: 'DEPANO_ANNUAL_STUDIO',
    name: 'Studio Plan',
    icon: '🏢',
    originalPrice: '54,999',
    discountedPrice: '44,999',
    credits: 6000,
    description:
      'Designed for studios and power users who want maximum annual value and performance.',
    features: [
      'All Designer Yearly features',
      'Dedicated support',
      'Best annual value per credit',
    ],
    popular: false,
  },
];

export const TOP_UP_PLANS: DepanoAIPlan[] = [
  {
    planCode: 'DEPANO_TOP_UP_SMALL',
    name: 'Small Top-up',
    icon: '🔋',
    originalPrice: '-',
    discountedPrice: '75',
    credits: 6,
    description: 'Add a burst of credits for on-demand editing and generation.',
    features: [
      'Fast credit refill',
      'Perfect for occasional extra usage',
      'Useful for one-off projects',
    ],
    popular: false,
  },
  {
    planCode: 'DEPANO_TOP_UP_MEDIUM',
    name: 'Medium Top-up',
    icon: '🔋',
    originalPrice: '-',
    discountedPrice: '125',
    credits: 10,
    description:
      'A flexible boost for users who need creative capacity without a full plan.',
    features: [
      'Best value for occasional growth',
      'Perfect for campaign bursts',
      'Instant extra credits',
    ],
    popular: true,
  },
  {
    planCode: 'DEPANO_TOP_UP_LARGE',
    name: 'Large Top-up',
    icon: '🔋',
    originalPrice: '-',
    discountedPrice: '250',
    credits: 20,
    description:
      'Large top-up option for edits, fast turnarounds, and high-volume work.',
    features: [
      'Maximum pay-as-you-go value',
      'Great for sales season or bulk work',
      'Use only what you need',
    ],
    popular: false,
  },
];
