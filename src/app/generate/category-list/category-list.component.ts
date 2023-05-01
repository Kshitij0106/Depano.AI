import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  @Input() categoryList: Category[] = [];
  @Output() selectedCategory = new EventEmitter<string>();

  constructor() {}

  selectCategory(categoryName: string) {
    this.selectedCategory.emit(categoryName);
  }
}
