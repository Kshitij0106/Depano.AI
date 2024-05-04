import { Subcategory } from './subcategory';

export interface Category {
  code: string;
  subCategories: Subcategory[];
  next: boolean; // next sub level
  key: string; // type of subcategories
}
