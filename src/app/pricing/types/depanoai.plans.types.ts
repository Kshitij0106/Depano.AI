import { DepanoAIPlan } from '../models/plans.model';
import { PlanType } from '../models/planType.model';

export const DEPANOAIPLANS: DepanoAIPlan[] = [
  {
    planCode: PlanType.DP_STARTER,
    name: 'Starter Plan',
    icon: '🧵',
    price: '₹949',
    designs: '80 Credits',
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
    planCode: PlanType.DP_DESIGNER,
    name: 'Designer Plan',
    icon: '👗',
    price: '₹2,099',
    designs: '200 Credits',
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
    planCode: PlanType.DP_STUDIO,
    name: 'Studio Plan',
    icon: '🏢',
    price: '₹4,499',
    designs: '500 Credits',
    credits: 500,
    description:
      'Designed for fashion houses and power users who need scale and efficiency.',
    features: [
      'All Designer features',
      'Dedicated support',
      'Best value per design',
      'Ideal for heavy usage',
    ],
    popular: false,
  },
];

export const DEPANOAIPLANS_YEARLY: DepanoAIPlan[] = [
  {
    planCode: PlanType.DP_STARTER_YEARLY,
    name: 'Starter Yearly',
    icon: '🧵',
    price: '₹9,999',
    designs: '1,000 Credits',
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
    planCode: PlanType.DP_DESIGNER_YEARLY,
    name: 'Designer Yearly',
    icon: '👗',
    price: '₹21,999',
    designs: '2,500 Credits',
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
    planCode: PlanType.DP_STUDIO_YEARLY,
    name: 'Studio Yearly',
    icon: '🏢',
    price: '₹44,999',
    designs: '6,000 Credits',
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

export const DEPANOAIPLANS_TOPUP: DepanoAIPlan[] = [
  {
    planCode: PlanType.DP_TOPUP_SMALL,
    name: 'Top-up 75',
    icon: '🔋',
    price: '₹75',
    designs: '6 Credits',
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
    planCode: PlanType.DP_TOPUP_MEDIUM,
    name: 'Top-up 125',
    icon: '🔋',
    price: '₹125',
    designs: '10 Credits',
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
    planCode: PlanType.DP_TOPUP_LARGE,
    name: 'Top-up 250',
    icon: '🔋',
    price: '₹250',
    designs: '20 Credits',
    credits: 20,
    description:
      'Large top-up option for heavy edits, fast turnarounds, and high-volume work.',
    features: [
      'Maximum pay-as-you-go value',
      'Great for sales season or bulk work',
      'Use only what you need',
    ],
    popular: false,
  },
];
