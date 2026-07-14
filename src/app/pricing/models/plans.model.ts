export interface DepanoAIPlan {
  planCode: string;
  name: string;
  icon: string;
  originalPrice: string;
  discountedPrice: string;
  credits: number;
  description: string;
  features: string[];
  popular: boolean;
}
