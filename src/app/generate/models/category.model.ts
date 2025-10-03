import { Subcategory } from './subcategory.model';

export interface Category {
  code: string;
  subCategories: Subcategory[];
  next: boolean; // next sub level
  key: string; // type of subcategories
}
