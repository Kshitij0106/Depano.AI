import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PromptService } from '../service/prompt.service';
import { Category } from '../category';
import { Subcategory } from '../subcategory';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
import { CategoryService } from '../service/data/category.service';

@Component({
  selector: 'app-optional-types',
  templateUrl: './optional-types.component.html',
  styleUrls: ['./optional-types.component.css'],
})
export class OptionalTypesComponent {
  optionalCategory: string = '';
  optionalAttribute: string = '';
  private selectedOptionalCategory!: Category;
  optionalList: Subcategory[] = [];
  userOptionalInput: string = '';
  hideUserInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.getRoute();
  }

  /**
   * Retrieves the 'category' route parameter from URL.
   */
  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.optionalCategory = params.get('category') || '';
      this.optionalAttribute = params.get('type') || '';
      if (this.optionalAttribute === '') {
        this.getOptionalCategory(this.optionalCategory);
      }
    });
  }

  /**
   * Retrieves a category based on the provided category string.
   * @param {string} optionalCategory - The category string to retrieve from the API.
   */
  getOptionalCategory(optionalCategory: string) {
    this.categoryService
      .getCategory(optionalCategory, 'optional')
      .subscribe((optionalCategory) => {
        this.loadOptionalCategory(optionalCategory);
        this.loadOptionalCategoryList();
      });
  }

  /**
   * Loads and sets the 'selected optional category'.
   * @param {Category} optionalCategory - The category to load.
   */
  loadOptionalCategory(optionalCategory: Category) {
    this.selectedOptionalCategory = optionalCategory;
    if (this.selectedOptionalCategory.key === 'attributes') {
      this.hideUserInput = true;
    } else {
      this.hideUserInput = false;
    }
  }

  /**
   * Loads and sets the 'list of subcategories' for the currently selected category.
   */
  loadOptionalCategoryList() {
    this.optionalList = this.sortList(
      this.selectedOptionalCategory.subCategories
    );
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
   * @param {string} subCategory - The category selected by the user.
   */
  categorySelected(subCategory: Subcategory) {
    this.setPrompt(this.selectedOptionalCategory.key, subCategory.prompt);
    if (this.selectedOptionalCategory.next) {
      this.categoryService
        .getCategory(subCategory.code, 'subcategory')
        .subscribe((category) => {
          // If the user is selecting categories
          this.breadcrumbService.addBreadcrumb(
            subCategory.code,
            subCategory.name
          );
          this.loadOptionalCategory(category);
          this.loadOptionalCategoryList();
          this.nextCategory(category.code);
        });
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
    if (this.selectedOptionalCategory.next) {
      // If the user is selecting categories
      this.setPrompt('user-optional-input', this.userOptionalInput);
    } else {
      // If the user is selecting attribute
      this.setPrompt(this.selectedOptionalCategory.key, this.userOptionalInput);
      this.previousCategory();
    }
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
    this.promptService.showPrompt();
    this.router.navigate(['../../../../', 'result'], {
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
    this.router.navigate(['../', ''], {
      relativeTo: this.route,
    });
  }
}
