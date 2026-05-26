import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  ParamMap,
  Router,
  RouterLink,
} from '@angular/router';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import {
  BreadcrumbService,
  breadcrumb,
} from 'src/app/services/breadcrumb.service';
import { CategoryService } from '../services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { CheckedAttributesService } from '../services/checked-attributes.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { UserInputComponent } from '../user-input/user-input.component';
import { PromptService } from 'src/app/services/prompt.service';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [
    HeaderComponent,
    CategoryListComponent,
    UserInputComponent,
    CommonModule,
    RouterLink,
    LucideAngularModule,
  ],
})
export class CategoryComponent implements OnInit {
  private category: string = '';
  private selectedCategory!: Category;
  // Cloth selected by user. Route to previous category after selecting attribute
  private selectedClothCode: string = '';
  public showGenerateButton: boolean = false;

  public categoryLists: Subcategory[] = [];
  // Determine type of category
  public categoryKey: string = '';
  public showCheckBox: boolean = false;
  // To check whether the selected category is attribute or value
  public attributeListType: string = '';
  // Code of the selected attribute
  public selectedCategoryCode: string = '';

  // Name used in user input prompt
  public selectedCategoryName: string = '';
  public hideUserPrompt: boolean = false;

  private navigationSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private promptService: PromptService,
    private checkAttributeService: CheckedAttributesService,
    private breadcrumbService: BreadcrumbService,
    private errorService: ErrorService,
    private toastr: ToastrService,
  ) {}

  /**
   * Implements the Angular lifecycle hook `ngOnInit`.
   * Loads the category based on the provided category from the API.
   */
  ngOnInit(): void {
    this.getCategory(this.getRoute());
    this.onBackButton();
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
    this.categoryService.getCategory(category).subscribe({
      next: (category) => {
        this.loadCategory(category);
        this.loadCategoryList();
      },
      error: (err) => {
        if (err.error?.status !== 'NOT_FOUND') {
          this.errorService.errorSubject.next(err.error?.status);
          this.router.navigate(['error']);
        }
      },
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
   * Loads and sets the 'list of subcategories' for the currently selected category.
   */
  loadCategoryList() {
    this.categoryLists = this.selectedCategory.subCategories;
  }

  /**
   * Checks if the user prompt box is shown or not.
   * Check whether to show skip or generate button.
   * Set the Selected clothing code.
   * @param {Category} category - The category to check.
   */
  checkCategory(category: Category) {
    this.categoryKey = this.selectedCategory.key;
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
      this.showCheckBox = true;
    } else {
      this.showGenerateButton = false;
      this.showCheckBox = false;
    }

    if (!this.selectedCategory.next) {
      this.showCheckBox = true;
      this.attributeListType = 'value';
      this.selectedCategoryCode = this.selectedCategory.code;
    } else {
      this.attributeListType = 'attribute';
      this.selectedCategoryCode = '';
    }
  }

  /**
   * Navigates to a specific category or subcategory based on the provided 'code',
   * from the header component.
   * @param {string} code - The 'code' of the category or subcategory to navigate to.
   */
  goToBreadcrumb(code: string) {
    this.getCategory(code);
    this.breadcrumbService.createNewList(code);
    this.checkAttributeService.emptyCheckedAttributesList();
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
          image:
            'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FCategory%2FMen%2FTop%2FWestern%2Fcoats.png?alt=media&token=594f7144-44e4-4313-8454-bb156a32601c',
          code: 'western',
        },
        {
          name: 'Indianwear',
          image:
            'https://firebasestorage.googleapis.com/v0/b/depano-ai.appspot.com/o/App%2FCategory%2FMen%2FBottom%2FIndian%2Flungi.png?alt=media&token=20a4ae95-b8fc-41c8-8de0-82b39fd78f93',
          code: 'indian',
        },
      );
    } else {
      if (this.selectedCategory.next) {
        // If the user skips the category
        let subCat = this.categoryLists;
        for (let i = 0; i < subCat.length; i++) {
          // Loop to iterate over the subcategories of selected category
          this.categoryService.getCategory(subCat[i].code).subscribe({
            next: (cat) => {
              // All skip case
              if (
                cat.key === 'type' &&
                this.breadcrumbService.getBreadcrumbs().length == 1
              ) {
                this.getCategory('optional');
              } else {
                if (cat.key === 'type') {
                  const gender = this.promptService.getGender();
                  const currentCategory = this.selectedCategory.code
                    .split('-')
                    .at(0);
                  if (
                    this.selectedCategory.code === 'top' ||
                    this.selectedCategory.code === 'bottom' ||
                    this.selectedCategory.code === 'dress-wear'
                  ) {
                    // if only top or bottom or dress is selected
                    this.getCategory(gender + '-' + currentCategory);
                    this.changeCategoryRoute(gender + '-' + currentCategory);
                  } else if (
                    // if only western or indian wear is selected
                    this.selectedCategory.code === 'indian' ||
                    this.selectedCategory.code === 'western'
                  ) {
                    this.getCategory(gender + '-' + 'wear');
                    this.changeCategoryRoute(gender + '-' + 'wear');
                  } else {
                    // when cloth-type is skipped
                    this.getCategory(gender + '-' + currentCategory);
                    this.changeCategoryRoute(gender + '-' + currentCategory);
                  }
                }
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
                        (item) => item.name === cat.subCategories[j].name,
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
            },
            error: (err) => {
              if (
                err.error?.status !== 'NOT_FOUND' &&
                err.error?.status !== 'BAD_REQUEST'
              ) {
                this.errorService.errorSubject.next(err.error?.status);
                this.router.navigate(['error']);
              }
            },
          });
        }
      } else {
        // If the user is selecting attribute, route to previous category
        this.getCategory(this.selectedClothCode);
        this.changeCategoryRoute(this.selectedClothCode);
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
    this.selectedCategoryName = subCategory.name;
    if (this.selectedCategory.next) {
      // If the user is selecting categories
      if (this.selectedCategory.key !== 'type') {
        // Only adding if not attribute
        this.breadcrumbService.addBreadcrumb(
          subCategory.code,
          subCategory.name,
        );
      }
      this.getCategory(subCategory.code);
      this.changeCategoryRoute(subCategory.code);
    } else {
      // If the user is selecting attribute, route to previous category
      this.categoryService.saveAttributeValue(subCategory.code).subscribe({
        error: (err) => {
          if (
            err.error?.status === 'NOT_FOUND' ||
            err.error?.status === 'BAD_REQUEST'
          ) {
            this.toastr.error(err.error?.message);
          } else {
            this.errorService.errorSubject.next(err.error?.status);
            this.router.navigate(['error']);
          }
        },
      });
      this.getCategory(this.selectedClothCode);
      this.changeCategoryRoute(this.selectedClothCode);
      // add selected attribute to a list
      this.checkAttributeService.addSelectedAttribute(
        this.selectedCategory.code,
        subCategory.code,
      );
    }
  }

  /**
   * Retrieves the 'input' from the frontend.
   * @param {string} input - The input entered by user in text box.
   */
  inputSelected(input: string) {
    if (this.selectedCategory.next) {
      if (
        this.selectedCategory.key === 'gender' &&
        this.breadcrumbService.getBreadcrumbs().length == 1
      ) {
        this.setPrompt('type', input);
        this.getCategory('optional');
      } else {
        // If the user is selecting categories
        // Set the 'user-input' prompt
        this.setPrompt('type', input);
        const gender = this.promptService.getGender();
        if (this.selectedCategory.key === 'style') {
          this.getCategory(gender + '-' + 'wear');
          this.changeCategoryRoute(gender + '-' + 'wear');
        } else if (this.selectedCategory.key === 'wear') {
          const currentCategory = this.selectedCategory.code.split('-').at(0);
          this.getCategory(gender + '-' + currentCategory);
          this.changeCategoryRoute(gender + '-' + currentCategory);
        }
      }
    } else {
      // If the user is selecting attributes, route to previous category
      this.setPrompt(
        this.selectedCategory.key,
        input + ' ' + this.selectedCategory.key,
      );
      this.getCategory(this.selectedClothCode);
      this.changeCategoryRoute(this.selectedClothCode);
      // add selected attribute to a list
      this.checkAttributeService.addSelectedAttribute(
        this.selectedCategory.code,
        input,
      );
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
   * Removes the selected attribute from the list.
   * @param {string} code - The category selected by the user.
   */
  onRemoveSelectedAttribute(code: string) {
    this.categoryService.removeAttributeValue(code).subscribe({
      error: (err) => {
        if (
          err.error?.status === 'NOT_FOUND' ||
          err.error?.status === 'BAD_REQUEST'
        ) {
          this.toastr.error(err.error?.message);
        } else {
          this.errorService.errorSubject.next(err.error?.status);
          this.router.navigate(['error']);
        }
      },
    });
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
    this.router.navigate(['../../', 'result'], {
      relativeTo: this.route,
    });
    this.imageService.generateImage();
  }

  onBackButton() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['/mode-select']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
