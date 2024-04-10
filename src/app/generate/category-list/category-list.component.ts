import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subcategory } from '../interfaces/subcategory';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Input() categoryList: Subcategory[] = [];
  @Output() selectedCategory = new EventEmitter<Subcategory>();
  category!: Subcategory;
  searchKey!: string;

  constructor(private searchService: SearchService) {}

  /**
   * Implements the Angular lifecycle hook `ngOnInit`.
   * Subscribes to the `searchText` observable from the `searchService`
   * to update the `searchKey` property whenever the search text changes
   * for searching the category from the category list.
   */
  ngOnInit(): void {
    this.searchService.searchText.subscribe((text) => {
      this.searchKey = text;
    });
  }

  /**
   * @emits {Category} selectedCategory - The category selected by the user to category component.
   * @param categoryCode - The code of the selected category.
   * @param categoryName - The name of the selected category.
   */
  selectCategory(
    categoryCode: string,
    categoryName: string,
    categoryPrompt: string
  ) {
    this.category = {
      name: categoryName,
      code: categoryCode,
      image: '',
    };

    this.selectedCategory.emit(this.category);
  }
}
