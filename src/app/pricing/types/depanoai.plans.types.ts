import { DepanoAIPlan } from '../models/plans.model';
import { PlanType } from '../models/planType.model';

export const DEPANOAIPLANS: DepanoAIPlan[] = [
  {
    planCode: PlanType.DP_STARTER,
    name: 'Starter Plan',
    icon: '🧵',
    price: '₹990',
    designs: '100 Credits',
    credits: 100,
    description:
      'Perfect for students and independent designers exploring new ideas and experimenting with styles.',
    features: [
      'Access to all design generation & editing features',
      'Fast processing using Gemini Imagine & SDXL',
      'Ideal for light usage',
    ],
    popular: false,
  },
  {
    planCode: PlanType.DP_DESIGNER,
    name: 'Designer Plan',
    icon: '👗',
    price: '₹2,090',
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
    price: '₹2,490',
    designs: '300 Credits',
    credits: 300,
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
