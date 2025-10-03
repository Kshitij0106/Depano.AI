import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subcategory } from '../models/subcategory.model';
import { CheckedAttributesService } from '../services/checked-attributes.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  imports: [CommonModule],
})
export class CategoryListComponent {
  @Input() categoryList: Subcategory[] = [];
  @Input() categoryKey: string = '';
  @Input() showCheckBox: boolean = false;
  @Input() attributeListType: string = '';
  @Input() selectedCategoryCode: string = '';

  @Output() selectedCategory = new EventEmitter<Subcategory>();
  @Output() removeCategory = new EventEmitter<string>();

  category!: Subcategory;
  searchKey!: string;

  selectedCode: string = '';

  constructor(private checkAttributeService: CheckedAttributesService) {}

  /**
   * @emits {Category} selectedCategory - The category selected by the user to category component.
   * Deletes it from the list if there.
   * @param categoryCode - The code of the selected category.
   * @param categoryName - The name of the selected category.
   */
  selectCategory(categoryCode: string, categoryName: string) {
    if (
      this.attributeListType === 'value' &&
      this.checkAttributeService.hasAttribute(this.selectedCategoryCode) &&
      categoryCode ===
        this.checkAttributeService.getAttributeValue(this.selectedCategoryCode)
    ) {
      this.checkAttributeService.removeSelectedAttribute(
        this.selectedCategoryCode
      );
      this.removeCategory.emit(this.selectedCategoryCode);
    } else {
      this.category = {
        name: categoryName,
        code: categoryCode,
        image: '',
      };
      this.selectedCategory.emit(this.category);
    }
  }

  /**
   * @param code - The code of the selected category.
   * Checks if the attribute is selected previously or not.
   * * @returns {boolean} - Returns `true` if the data is present, otherwise returns `false`.
   */
  checkAttribute(code: string): boolean {
    if (this.attributeListType === 'attribute') {
      return this.checkAttributeService.hasAttribute(code);
    } else {
      this.selectedCode = this.checkAttributeService.getAttributeValue(
        this.selectedCategoryCode
      );
      return true;
    }
  }
}
