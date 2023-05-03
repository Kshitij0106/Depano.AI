import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subcategory } from '../subcategory';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  @Input() categoryList: Subcategory[] = [];
  @Output() selectedCategory = new EventEmitter<Subcategory>();
  category!: Subcategory;

  constructor() {}

  selectCategory(categoryCode: string, categoryName: string) {
    this.category = {
      name: categoryName,
      code: categoryCode,
      image: '',
      prompt: '',
    };

    this.selectedCategory.emit(this.category);
  }
}
