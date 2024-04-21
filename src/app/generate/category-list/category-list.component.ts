import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subcategory } from '../models/subcategory';
import { CheckedAttributesService } from '../services/checked-attributes.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  @Input() categoryList: Subcategory[] = [];
  @Input() showCheckBox: boolean = false;
  @Output() selectedCategory = new EventEmitter<Subcategory>();
  category!: Subcategory;
  searchKey!: string;

  constructor(private checkAttributeService: CheckedAttributesService) {}

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

  /**
   * @param categoryCode - The code of the selected category.
   * Checks if the attribute is selected previously or not.
   */
  checkAttribute(code: string) {
    return this.checkAttributeService.getAttribute(code);
  }
}
