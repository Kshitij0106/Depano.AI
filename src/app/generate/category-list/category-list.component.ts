import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subcategory } from '../models/subcategory';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  @Input() categoryList: Subcategory[] = [];
  @Output() selectedCategory = new EventEmitter<Subcategory>();
  category!: Subcategory;
  searchKey!: string;

  constructor() {}

  /**
   * @emits {Category} selectedCategory - The category selected by the user to category component.
   * @param categoryCode - The code of the selected category.
   * @param categoryName - The name of the selected category.
   */
  selectCategory(categoryCode: string, categoryName: string) {
    this.category = {
      name: categoryName,
      code: categoryCode,
      image: '',
    };

    this.selectedCategory.emit(this.category);
  }
}
