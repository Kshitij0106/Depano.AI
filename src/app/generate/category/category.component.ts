import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../interfaces/category';
import { PromptService } from '../services/prompt.service';
import { Subcategory } from '../interfaces/subcategory';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { CategoryService } from '../services/data/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private category: string = '';
  public selectedCategoryKey: string = '';
  private selectedClothCode: string = '';
  private selectedCategory!: Category;
  categoryLists: Subcategory[] = [];
  private userInput: string = '';
  subcategory: Subcategory[] = [];
  userPrompt: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.getCategory(this.getRoute());
    //   }
    // });
  }

  /**
   * Implements the Angular lifecycle hook `ngOnInit`.
   * Retrieves the 'category' route parameter from URL.
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
      if (category.key === 'type') {
        this.selectedClothCode = category.code;
        console.log(this.selectedClothCode);
      }
      this.loadCategory(category);
      this.loadCategoryList();
    });
  }

  /**
   * Loads and sets the 'selected category'.
   * @param {Category} category - The category to load.
   */
  loadCategory(category: Category) {
    this.selectedCategory = category;
    this.hideUserPromptBox();
  }

  /**
   * Checks if the user prompt box is shown or not
   */
  hideUserPromptBox() {
    if (
      this.selectedCategory.key === 'gender' ||
      this.selectedCategory.key === 'wear' ||
      this.selectedCategory.key === 'type'
    ) {
      this.userPrompt = true;
    } else {
      this.userPrompt = false;
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
   * Skips to the next category by first retrieving all the subcategories
   * and adding it to a new list.
   */
  onSkip() {
    let newCategoryList: Subcategory[] = [];
    if (this.selectedCategory.key === 'type') {
      this.generate();
    }
    if (this.categoryLists[0].name.includes('Topwear')) {
      // If the user skips any wear then add 2 new subcategories
      newCategoryList.push(
        {
          name: 'Westernwear',
          image: '',
          code: 'western',
          // prompt: 'western-style',
        },
        {
          name: 'Indianwear',
          image: '',
          code: 'indian',
          // prompt: 'indian-style',
        }
      );
    } else {
      if (this.selectedCategory.next) {
        // If the user skips the category
        let subCat = this.categoryLists;
        for (let i = 0; i < subCat.length; i++) {
          // Loop to iterate over the subcategories of selected category
          this.categoryService.getCategory(subCat[i].code).subscribe((cat) => {
            if (cat.key === 'type') {
              this.userPrompt = false;
            }
            if (cat.key === 'attributes') {
              // If the selected category is an attribute
              // this.gettingAttributes = true;
              // // If the user skips every category
              if (
                this.promptService.getKey('wear') === '' &&
                this.promptService.getKey('style') === '' &&
                this.promptService.getKey('type') === ''
              ) {
                // newCategoryList = [];
                // newCategoryList.push(
                //   {
                //     name: 'Fabric',
                //     image: '',
                //     code: 'fabric',
                //     prompt: '',
                //   },
                //   {
                //     name: 'Color',
                //     image: '',
                //     code: 'color',
                //     prompt: '',
                //   }
                // );
              }
            }

            // Loop to iterate over the subcategories of the subcategories
            for (let j = 0; j < cat.subCategories.length; j++) {
              if (!newCategoryList.includes(cat.subCategories[j])) {
                // Adding attributes only once to the list
                if (cat.key === 'attributes') {
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
          });
        }
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
      this.breadcrumbService.addBreadcrumb(subCategory.code, subCategory.name);
      this.getCategory(subCategory.code);
      this.nextCategory(subCategory.code);
    } else {
      // If the user is selecting attribute
      this.categoryService.getAttribute(subCategory.code).subscribe();
      this.getCategory(this.selectedClothCode);
      // this.previousCategory();
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
        const gender = this.promptService.getValue('gender');
        this.setPrompt('type', this.userInput);
        this.getCategory(gender + '-' + currentCategory);
        this.nextCategory(gender + '-' + currentCategory);
      }
    } else {
      // If the user is selecting attributes
      this.setPrompt(this.selectedCategory.key, this.userInput);
      this.getCategory(this.selectedClothCode);
      // this.previousCategory();
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
   * Navigates to the next category selected by user.
   * @param {string} category - The category to navigate to.
   */
  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  /**
   * Navigates to the result component.
   */
  generate() {
    this.promptService.showPrompt();
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
