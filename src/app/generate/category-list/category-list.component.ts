import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subcategory } from '../subcategory';
import { SearchService } from '../service/search.service';

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

  ngOnInit(): void {
    this.searchService.searchText.subscribe((text) => {
      this.searchKey = text;
    });
  }

  selectCategory(
    categoryCode: string,
    categoryName: string,
    categoryPrompt: string
  ) {
    this.category = {
      name: categoryName,
      code: categoryCode,
      image: '',
      prompt: categoryPrompt,
    };

    this.selectedCategory.emit(this.category);
  }
}
