import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { MenCategoryService } from '../service/data/men-category.service';
import { WomenCategoryService } from '../service/data/women-category.service';
import { Category } from '../category';
import { PromptService } from '../service/prompt.service';
import { Subcategory } from '../subcategory';
import { BreadcrumbService } from 'src/app/service/breadcrumb.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  private category: string = '';
  private selectedCategory!: Category;
  private selectedClothingCode: string = '';
  private userInput: string = '';
  categoryLists: Subcategory[] = [];
  subcategory: Subcategory[] = [];
  private gettingAttributes = false;
  mandatoryAttributeIndex = 0;

  /**
   * @constructor
   * Retrieves the 'category' route parameter from URL.
   * Loads and sets the selected category based on the provided category from the API.
   * Loads and sets the list of subcategories for the currently selected category.
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menCategoryService: MenCategoryService,
    private womenCategoryService: WomenCategoryService,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
    private location: Location
  ) {
    this.loadCategory(this.getRoute());
    this.loadCategoryList();
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
   * Loads and sets the 'selected category' based on the provided category from the API.
   * @param {string} category - The category string to load.
   */
  loadCategory(category: string) {
    this.selectedCategory = this.getCategory(category);
  }

  /**
   * Loads and sets the 'list of subcategories' for the currently selected category.
   */
  loadCategoryList() {
    this.categoryLists = this.selectedCategory.subCategories;
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
   * Navigates to a specific category or subcategory based on the provided 'code',
   * from the header component.
   * @param {string} code - The 'code' of the category or subcategory to navigate to.
   */
  goToBreadcrumb(code: string) {
    var subcategory: string[];
    if (this.getCategory(code).next) {
      // If the 'code' belong to category('wear', 'type', 'gender')
      this.gettingAttributes = false;
      this.mandatoryAttributeIndex = 0;
    } else {
      // If the 'code' belong to attributes
      if (this.selectedClothingCode === '') {
        // this.selectedClothingCode = this.getRoute();
      }
      // Retrieve the list of attributes codes from the selected cloth
      subcategory = this.getCategory(
        this.selectedClothingCode
      ).subCategories.map((cat) => {
        return cat.code;
      });
      // Find the index of the slelcted 'attribute' in the subcategory list to get it's index.
      var idx = subcategory.indexOf(code);
      this.mandatoryAttributeIndex = idx + 1;
    }
    this.loadCategory(code);
    this.loadCategoryList();
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
        // If the user skips any wear then add
        // 2 new sub categories to the list based on the gender
        let gender = this.promptService.getKey('gender').toLowerCase();
        newCategoryList.push(
          {
            name: 'Westernwear',
            image: '',
            code: gender + '-western',
            prompt: '',
          },
          {
            name: 'Indianwear',
            image: '',
            code: gender + '-indian',
            prompt: '',
          }
        );
      } else {
        if (this.selectedCategory.next) {
          // If the user skips the category
          let subCat = this.categoryLists;
          for (let i = 0; i < subCat.length; i++) {
            // Loop to iterate over the subcategories of selected category
            let selCat = this.getCategory(subCat[i].code);
            if (selCat && selCat.next) {
              if (selCat.key === 'attributes') {
                // If the selected category is an attribute
                this.gettingAttributes = true;
              }
              // Loop to iterate over the subcategories of the subcategories
              for (let j = 0; j < selCat.subCategories.length; j++) {
                if (!newCategoryList.includes(selCat.subCategories[j])) {
                  // Adding attributes only once to the list
                  if (selCat.key === 'attributes') {
                    // Finding the attribute in the exisitng list
                    const duplicate = newCategoryList.find(
                      (item) => item.name === selCat.subCategories[j].name
                    );
                    if (!duplicate) {
                      newCategoryList.push(selCat.subCategories[j]);
                    }
                  } else {
                    // Directly add the category to the list
                    // without checking as categories are unique
                    newCategoryList.push(selCat.subCategories[j]);
                  }
                }
              }
            }
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
   * @param {string} category - The category selected by the user.
   */
  categorySelected(category: Subcategory) {
    this.setPrompt(this.selectedCategory.key, category.prompt);
    if (this.gettingAttributes) {
      // If the user is already selecting attributes
      this.getMandatoryAttributes();
    } else {
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      if (this.getCategory(category.code).key === 'attributes') {
        // If the user selects cloth then switch the flow to display attributes
        this.gettingAttributes = true;
        this.selectedClothingCode = category.code;
        this.loadCategory(category.code);
        this.getMandatoryAttributes();
      } else if (this.selectedCategory.next) {
        // If the user is selecting categories then regular flow
        this.loadCategory(category.code);
        this.loadCategoryList();
        this.nextCategory(category.code);
      }
    }
  }

  /**
   * Displaying the attributes to the user automatically by chaning the flow.
   */
  getMandatoryAttributes() {
    var code = '';
    if (this.mandatoryAttributeIndex == 0) {
      // If getting attribute for the first time
      if (this.selectedClothingCode === '') {
        // If cloth is not selected then previous subcategory list is selected
        this.subcategory = this.categoryLists;
      } else {
        // If cloth is selected then gets attributes of the selected cloth
        this.subcategory = this.getCategory(
          this.selectedClothingCode
        ).subCategories;
      }
    }
    // Loading all the attributes of the cloth one by one based on the index
    if (this.mandatoryAttributeIndex < this.subcategory.length) {
      code = this.subcategory[this.mandatoryAttributeIndex].code;
      this.loadCategory(code);
      this.loadCategoryList();
      this.breadcrumbService.addBreadcrumb(
        code,
        this.subcategory[this.mandatoryAttributeIndex].name
      );
      this.mandatoryAttributeIndex++;
    } else {
      // If all the attributes are shown then go to optional component
      this.optionalCategory();
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
    this.promptService.showPrompt();
    if (this.selectedClothingCode === '') {
      // If the cloth is not selected, set it based on user's gender
      this.selectedClothingCode =
        this.promptService.getKey('gender') === 'Male' ? 'Men' : 'Women';
    }
    this.router.navigate(['../', 'optional', this.selectedClothingCode], {
      relativeTo: this.route,
    });
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

// if (
//   this.promptService.getKey('wear') === '' &&
//   this.promptService.getKey('style') === '' &&
//   this.promptService.getKey('type') === ''
// ) {
//   newCategoryList.push(
//     {
//       name: 'Fabric',
//       image: '',
//       code: 'fabric',
//       prompt: '',
//     },
//     {
//       name: 'Color',
//       image: '',
//       code: 'color',
//       prompt: '',
//     }
//   );
