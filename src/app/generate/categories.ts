import { Category } from './category';

export interface Categories {
  categories: Category[];
  optionalTypes: string[]; // optional types
  mandatoryPrompts: string[]; // mandatory prompts
  next: boolean; // next sub level
}
