import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { Category } from '../category';
import { PromptService } from '../service/prompt.service';
import { Subcategory } from '../subcategory';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';
import { CategoryService } from '../service/data/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private category: string = '';
  private selectedCategory!: Category;
  categoryLists: Subcategory[] = [];
  private selectedClothingCode: string = '';
  private userInput: string = '';
  subcategory: Subcategory[] = [];
  private gettingAttributes = false;
  mandatoryAttributeIndex = 0;
  hideUserInput: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService
  ) {}

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
    this.categoryService
      .getCategory(category, 'subcategory')
      .subscribe((category) => {
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
    if (
      this.selectedCategory.key === 'wear' ||
      this.selectedCategory.key === 'style' ||
      this.selectedCategory.key === 'attributes'
    ) {
      this.hideUserInput = true;
    } else {
      this.hideUserInput = false;
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
    this.categoryService
      .getCategory(code, 'subcategory')
      .subscribe((category) => {
        if (category.next) {
          // If the 'code' belong to category('wear', 'type', 'gender')
          this.gettingAttributes = false;
          this.mandatoryAttributeIndex = 0;
        } else {
          // If the 'code' belong to attributes
          // Retrieve the list of attributes codes from the selected cloth
          subcategory = this.subcategory.map((cat) => {
            return cat.code;
          });
          // Find the index of the slelcted 'attribute' in the subcategory list to get it's index.
          var idx = subcategory.indexOf(code);
          this.mandatoryAttributeIndex = idx + 1;
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
    if (this.gettingAttributes) {
      // If the user is already selecting attributes
      this.getMandatoryAttributes();
    } else {
      if (this.categoryLists[0].name.includes('Topwear')) {
        // If the user skips any wear then add 2 new subcategories
        newCategoryList.push(
          {
            name: 'Westernwear',
            image: '',
            code: 'western',
            prompt: 'western-style',
          },
          {
            name: 'Indianwear',
            image: '',
            code: 'indian',
            prompt: 'indian-style',
          }
        );
      } else {
        if (this.selectedCategory.next) {
          // If the user skips the category
          let subCat = this.categoryLists;
          for (let i = 0; i < subCat.length; i++) {
            // Loop to iterate over the subcategories of selected category
            this.categoryService
              .getCategory(subCat[i].code, 'subcategory')
              .subscribe((cat) => {
                if (cat.key === 'type') {
                  this.hideUserInput = false;
                }
                if (cat.key === 'attributes') {
                  // If the selected category is an attribute
                  this.gettingAttributes = true;
                  // If the user skips every category
                  if (
                    this.promptService.getKey('wear') === '' &&
                    this.promptService.getKey('style') === '' &&
                    this.promptService.getKey('type') === ''
                  ) {
                    this.optionalCategory();
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
      // If getting attribute for the first time
      if (this.gettingAttributes) {
        this.getMandatoryAttributes();
      }
    }
  }

  /**
   * Retrieves the data of the 'category' selected by the user.
   * @param {string} subCategory - The category selected by the user.
   */
  categorySelected(subCategory: Subcategory) {
    this.category = subCategory.code;
    this.setPrompt(this.selectedCategory.key, subCategory.prompt);
    if (this.gettingAttributes) {
      // If the user is already selecting attributes
      this.getMandatoryAttributes();
    } else {
      this.breadcrumbService.addBreadcrumb(subCategory.code, subCategory.name);
      this.categoryService
        .getCategory(subCategory.code, 'subcategory')
        .subscribe((category) => {
          this.nextCategory(subCategory.code);
          if (category.key === 'attributes') {
            // If the user selects cloth then switch the flow to display attributes
            this.gettingAttributes = true;
            this.selectedClothingCode = category.code;
            this.loadCategory(category);
            this.subcategory = category.subCategories;
            this.getMandatoryAttributes();
          } else if (this.selectedCategory.next) {
            // If the user is selecting categories then regular flow
            this.loadCategory(category);
            this.loadCategoryList();
          }
        });
    }
  }

  /**
   * Displaying the attributes to the user automatically by chaning the flow.
   */
  getMandatoryAttributes() {
    var code = '';
    this.gettingAttributes = true;
    // Loading all the attributes of the cloth one by one based on the index
    if (this.mandatoryAttributeIndex < this.subcategory.length) {
      code = this.subcategory[this.mandatoryAttributeIndex].code;
      this.categoryService
        .getCategory(code, 'subcategory')
        .subscribe((category) => {
          this.loadCategory(category);
          this.loadCategoryList();
        });
      this.breadcrumbService.addBreadcrumb(
        code,
        this.subcategory[this.mandatoryAttributeIndex].name
      );
      this.mandatoryAttributeIndex++;
    } else {
      // If all the attributes are shown then go to optional component
      this.optionalCategory();
      this.gettingAttributes = false;
    }
  }

  /**
   * Retrieves the 'input' from the frontend.
   * @param {string} input - The input entered by user in text box.
   */
  inputSelected(input: string) {
    this.userInput = input;
    if (
      this.selectedCategory.next &&
      this.selectedCategory.key !== 'attributes'
    ) {
      // If the user is selecting categories
      // Set the 'user-input' prompt and navigate to the optional category
      this.setPrompt('user-input', this.userInput);
      this.optionalCategory();
    } else {
      // If the user is selecting attributes
      // Set the 'input' prompt and continue to get next attributes
      this.setPrompt(this.selectedCategory.key, this.userInput);
      this.getMandatoryAttributes();
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
   * Navigates to the Optional component.
   */
  optionalCategory() {
    if (this.selectedClothingCode === '') {
      // If the cloth is not selected, set it based on user's gender
      this.selectedClothingCode =
        this.promptService.getKey('gender') === 'men' ? 'men' : 'women';
    }
    this.router.navigate(['../', this.selectedClothingCode, 'optional', ''], {
      relativeTo: this.route,
    });
  }

  /**
   * Removes the last breadcrumb when back button is pressed.
   */
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.breadcrumbService.removeBreadcrumb();
  }
}
