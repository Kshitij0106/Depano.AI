import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../models/category';
import { PromptService } from '../services/prompt.service';
import { Subcategory } from '../models/subcategory';
import {
  BreadcrumbService,
  breadcrumb,
} from 'src/app/services/breadcrumb.service';
import { CategoryService } from '../services/data/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private category: string = '';
  public showGenerateButton: boolean = false;
  public selectedCategoryKey: string = '';
  private selectedClothCode: string = '';
  public selectedCategory!: Category;
  categoryLists: Subcategory[] = [];
  private userInput: string = '';
  subcategory: Subcategory[] = [];
  hideUserPrompt: boolean = false;

  breadcrumbs!: Map<string, string>;
  list: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {}

  /**
   * Implements the Angular lifecycle hook `ngOnInit`.
   * Loads the category based on the provided category from the API.
   */
  ngOnInit(): void {
    this.getCategory(this.getRoute());
  }

  /**
   * Retrieves the 'category' route parameter from URL.
   * @returns {string} - The value of the 'category' route parameter.
   */
  getRoute(): string {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category') || '';
    });
    return this.category;
  }

  /**
   * @param {string} category - The category string to load.
   * Loads the category based on the provided category from the API.
   */
  getCategory(category: string) {
    this.categoryService.getCategory(category).subscribe((category) => {
      this.loadCategory(category);
      this.loadCategoryList();
    });
  }

  /**
   * Loads and sets the 'selected category'.
   * Calls checkCategory Function.
   * @param {Category} category - The category to load.
   */
  loadCategory(category: Category) {
    this.selectedCategory = category;
    this.checkCategory(category);
  }

  /**
   * Checks if the user prompt box is shown or not.
   * Check whether to show skip or generate button.
   * Set the Selected clothing code.
   * @param {Category} category - The category to check.
   */
  checkCategory(category: Category) {
    if (
      this.selectedCategory.key === 'gender' ||
      this.selectedCategory.key === 'wear' ||
      this.selectedCategory.key === 'type'
    ) {
      this.hideUserPrompt = true;
    } else {
      this.hideUserPrompt = false;
    }

    if (this.selectedCategory.key === 'type') {
      this.selectedClothCode = category.code;
      this.showGenerateButton = true;
    } else {
      this.showGenerateButton = false;
    }
  }

  /**
   * Loads and sets the 'list of subcategories' for the currently selected category.
   */
  loadCategoryList() {
    this.categoryLists = this.selectedCategory.subCategories;
  }

  /**
   * Navigates to a specific category or subcategory based on the provided 'code',
   * from the header component.
   * @param {string} code - The 'code' of the category or subcategory to navigate to.
   */
  goToBreadcrumb(code: string) {
    this.breadcrumbService.createNewList(code);
    var subcategory: string[];
    this.categoryService.getCategory(code).subscribe((category) => {
      if (category.next) {
        // If the 'code' belong to category('wear', 'type', 'gender')
        // this.gettingAttributes = false;
        // this.mandatoryAttributeIndex = 0;
      } else {
        // If the 'code' belong to attributes
        // Retrieve the list of attributes codes from the selected cloth
        subcategory = this.subcategory.map((cat) => {
          return cat.code;
        });
        // Find the index of the slelcted 'attribute' in the subcategory list to get it's index.
        // var idx = subcategory.indexOf(code);
        // this.mandatoryAttributeIndex = idx + 1;
      }
      this.loadCategory(category);
      this.loadCategoryList();
    });
  }

  /**
   * A getter that retrieves the breadcrumb list from the breadcrumb service.
   * @returns {breadcrumb[]} - An array of breadcrumb items representing the current navigation path.
   */
  get breadcrumbsList(): breadcrumb[] {
    return this.breadcrumbService.getBreadcrumbs();
  }

  /**
   * Skips to the next category by first retrieving all the subcategories
   * and adding it to a new list.
   */
  onSkip() {
    let newCategoryList: Subcategory[] = [];
    if (this.categoryLists[0].name.includes('Topwear')) {
      // If the user skips any wear then add 2 new subcategories
      newCategoryList.push(
        {
          name: 'Westernwear',
          image: '',
          code: 'western',
        },
        {
          name: 'Indianwear',
          image: '',
          code: 'indian',
        }
      );
    } else {
      if (this.selectedCategory.next) {
        // If the user skips the category
        let subCat = this.categoryLists;
        for (let i = 0; i < subCat.length; i++) {
          // Loop to iterate over the subcategories of selected category
          this.categoryService.getCategory(subCat[i].code).subscribe((cat) => {
            // All skip case
            if (
              cat.key === 'type' &&
              this.breadcrumbService.getBreadcrumbs().length == 1
            ) {
              this.getCategory('optional');
            } else {
              if (cat.key === 'style') {
                this.hideUserPrompt = false;
              }
              // Loop to iterate over the subcategories of the subcategories
              for (let j = 0; j < cat.subCategories.length; j++) {
                if (!newCategoryList.includes(cat.subCategories[j])) {
                  // Adding attributes only once to the list
                  if (cat.key === 'type') {
                    // Finding the attribute in the exisitng list
                    const duplicate = newCategoryList.find(
                      (item) => item.name === cat.subCategories[j].name
                    );
                    if (!duplicate) {
                      newCategoryList.push(cat.subCategories[j]);
                    }
                  } else {
                    // Directly add the category to the list
                    // without checking as categories are unique
                    newCategoryList.push(cat.subCategories[j]);
                  }
                }
              }
            }
          });
        }
      } else {
        this.changeCategoryRoute(this.selectedClothCode);
        this.getCategory(this.selectedClothCode);
      }
    }
    this.categoryLists = newCategoryList;
  }

  /**
   * Retrieves the data of the 'category' selected by the user.
   * @param {string} subCategory - The category selected by the user.
   */
  categorySelected(subCategory: Subcategory) {
    this.category = subCategory.code;
    this.selectedCategoryKey = subCategory.name;
    if (this.selectedCategory.next) {
      // If the user is selecting categories
      this.breadcrumbService.addBreadcrumb(subCategory.code, subCategory.name);
      this.getCategory(subCategory.code);
      this.changeCategoryRoute(subCategory.code);
    } else {
      // If the user is selecting attribute, route to previous category
      this.categoryService.getAttribute(subCategory.code).subscribe();
      this.changeCategoryRoute(this.selectedClothCode);
      this.getCategory(this.selectedClothCode);
    }
  }

  /**
   * Retrieves the 'input' from the frontend.
   * @param {string} input - The input entered by user in text box.
   */
  inputSelected(input: string) {
    this.userInput = input;
    if (this.selectedCategory.next) {
      if (this.selectedCategory.key === 'style') {
        // If the user is selecting categories
        // Set the 'user-input' prompt
        const currentCategory = this.selectedCategory.code.split('-').at(0);
        const gender = this.promptService.getGender();
        this.setPrompt('type', this.userInput);
        this.getCategory(gender + '-' + currentCategory);
        this.changeCategoryRoute(gender + '-' + currentCategory);
      }
    } else {
      // If the user is selecting attributes, route to previous category
      this.setPrompt(this.selectedCategory.key, this.userInput);
      this.getCategory(this.selectedClothCode);
      this.changeCategoryRoute(this.selectedClothCode);
    }
  }

  /**
   * Sets a key-value pair in the "prompt" service if the key is non-empty and the value is non-empty.
   * @param {string} key - The key to selected Category.
   * @param {string} userInput - The user input of the selected category.
   */
  setPrompt(key: string, userInput: string) {
    if (key.length > 0 && userInput.length) {
      this.promptService.addToPrompt(key, userInput);
    }
  }

  /**
   * Navigates to the category selected by user.
   * @param {string} category - The category to navigate to.
   */
  changeCategoryRoute(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  /**
   * Navigates to the result component.
   */
  generate() {
    this.promptService.sendPrompt().subscribe();
    this.router.navigate(['../../', 'result'], {
      relativeTo: this.route,
    });
    this.promptService.emptyPrompt();
  }

  /**
   * Navigates to the previous category.
   */
  previousCategory() {
    this.location.back();
  }

  /**
   * Removes the last breadcrumb when back button is pressed.
   */
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.breadcrumbService.removeBreadcrumb();
  }
}
