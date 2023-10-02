import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd,
} from '@angular/router';
import { Location } from '@angular/common';
import { PromptService } from '../service/prompt.service';
import { Category } from '../category';
import { MenCategoryService } from '../service/data/men-category.service';
import { WomenCategoryService } from '../service/data/women-category.service';
import { Subcategory } from '../subcategory';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';

@Component({
  selector: 'app-optional-types',
  templateUrl: './optional-types.component.html',
  styleUrls: ['./optional-types.component.css'],
})
export class OptionalTypesComponent implements OnInit {
  type: string = '';
  optionalList: Subcategory[] = [];
  userOptionalInput: string = '';
  private selectedCategory!: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menCategoryService: MenCategoryService,
    private womenCategoryService: WomenCategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {
    this.getRoute();
  }

  /**
   * Implements the Angular lifecycle hook `ngOnInit`.
   * Subscribes to the router events and triggers `getRoute` method on `NavigationEnd` events
   * whenever the route changes.
   */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoute();
      }
    });
  }

  /**
   * Retrieves the 'category' route parameter from URL.
   */
  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type = params.get('type') || '';
      this.setCategory(this.type);
    });
  }

  /**
   * Retrieves a category based on the provided category string and user's gender.
   * @param {string} category - The category string to retrieve from the API.
   * @returns {Category} - The retrieved category object.
   */
  getCategory(category: string): Category {
    if (this.promptService.getKey('gender') === 'Male') {
      return this.menCategoryService.getCategory(category) as Category;
    } else if (this.promptService.getKey('gender') === 'Female') {
      return this.womenCategoryService.getCategory(category) as Category;
    }
    return {} as Category;
  }

  /**
   * Loads and sets the 'selected type' based on the provided category from the API.
   * @param {string} type - The category string to load.
   */
  setCategory(type: string) {
    this.selectedCategory = this.getCategory(type);
    if (this.selectedCategory.next) {
      // If the user is selecting categories
      this.optionalList = this.sortList(this.selectedCategory.optionalTypes);
    } else {
      // If the user is selecting attribute
      this.optionalList = this.selectedCategory.subCategories;
    }
  }

  /**
   * Removing duplicate optional attributes in case of skip.
   */
  sortList(list: Subcategory[]) {
    let names: string[] = [];
    return list.filter((item) => {
      const duplicate = names.includes(item.name);
      if (!duplicate) {
        names.push(item.name);
        return true;
      }
      return false;
    });
  }

  /**
   * Retrieves the data of the 'category' selected by the user.
   * @param {string} category - The category selected by the user.
   */
  categorySelected(category: Subcategory) {
    this.setPrompt(this.selectedCategory.key, category.prompt);
    if (this.selectedCategory.next) {
      // If the user is selecting categories
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      this.nextCategory(category.code);
    } else {
      // If the user is selecting attribute
      this.previousCategory();
    }
  }

  /**
   * Retrieves the 'input' from the frontend.
   * @param {string} input - The input entered by user in text box.
   */
  inputSelected(input: string) {
    this.userOptionalInput = input;
    if (this.selectedCategory.next) {
      // If the user is selecting categories
      this.setPrompt('user-optional-input', this.userOptionalInput);
    } else {
      // If the user is selecting attribute
      this.setPrompt(this.selectedCategory.key, this.userOptionalInput);
      this.previousCategory();
    }
    this.generate();
  }

  /**
   * Sets a key-value pair in the "prompt" service if the key is non-empty and the value is non-empty.
   * @param {string} key - The key to set.
   * @param {string} value - The prompt of the selected category.
   */
  setPrompt(key: string, value: string) {
    if (key.length > 0 && value.length) {
      this.promptService.addToPrompt(key, value);
    }
  }

  /**
   * Navigates to the result component.
   */
  generate() {
    this.router.navigate(['../../../', 'result'], {
      relativeTo: this.route,
    });
  }

  /**
   * Navigates to the next category selected by user.
   * @param {string} category - The category to navigate to.
   */
  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  /**
   * Navigates to the previous category.
   */
  previousCategory() {
    this.location.back();
  }
}
