import { PlanType } from './planType.model';

export interface DepanoAIPlan {
  planCode: PlanType;
  name: string;
  icon: string;
  price: string;
  designs: string;
  credits: number;
  description: string;
  features: string[];
  popular: boolean;
}
