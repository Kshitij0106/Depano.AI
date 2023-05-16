import { Subcategory } from './subcategory';

export interface Category {
  subCategories: Subcategory[];
  optionalTypes: Subcategory[]; // optional types
  next: boolean; // next sub level
  key: string; // mandatory prompts
}
