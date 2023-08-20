import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
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
  private selectedClothingCode!: string;
  private userInput: string = '';
  categoryLists: Subcategory[] = [];
  optionalToSkip: boolean = false;
  private gettingAttributes = false;
  mandatoryAttributeIndex = 0;

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
    this.loadCategory(this.category);
    this.loadCategoryList();
  }

  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category') || '';
    });
  }

  loadCategory(category: string) {
    this.selectedCategory = this.getCategory(category);
  }

  loadCategoryList() {
    this.categoryLists = this.selectedCategory.subCategories;
  }

  getCategory(category: string) {
    if (this.promptService.getKey('gender') === 'Male') {
      return this.menCategoryService.getCategory(category) as Category;
    } else if (this.promptService.getKey('gender') === 'Female') {
      return this.womenCategoryService.getCategory(category) as Category;
    }
    return {} as Category;
  }

  getSubCategoryList(category: string) {
    return this.getCategory(category).subCategories;
  }

  goToBreadcrumb(code: string) {
    if (this.getCategory(code).next) {
      this.gettingAttributes = false;
      this.mandatoryAttributeIndex = 0;
    } else {
      // find the index of the code in the list
    }
    this.loadCategory(code);
    this.loadCategoryList();
  }

  onSkip() {
    let newCategoryList: Subcategory[] = [];
    if (this.selectedCategory.key === 'attributes' || this.optionalToSkip) {
      this.optionalCategory();
    } else {
      if (this.categoryLists[0].name.includes('Topwear')) {
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
          let subCat = this.categoryLists;
          for (let i = 0; i < subCat.length; i++) {
            let selCat = this.getCategory(subCat[i].code);
            if (selCat && selCat.next) {
              if (selCat.key === 'attributes') {
                this.optionalToSkip = true;
              }
              for (let j = 0; j < selCat.subCategories.length; j++) {
                if (!newCategoryList.includes(selCat.subCategories[j])) {
                  if (selCat.key === 'attributes') {
                    const duplicate = newCategoryList.find(
                      (item) => item.name === selCat.subCategories[j].name
                    );
                    if (!duplicate) {
                      newCategoryList.push(selCat.subCategories[j]);
                    }
                  } else {
                    newCategoryList.push(selCat.subCategories[j]);
                  }
                }
              }
            }
          }
        }
      }
      this.categoryLists = newCategoryList;
    }
  }

  categorySelected(category: Subcategory) {
    this.setPrompt(this.selectedCategory.key, category.prompt);
    if (this.gettingAttributes) {
      this.getMandatoryAttributes();
    } else {
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      if (this.getCategory(category.code).key === 'attributes') {
        this.gettingAttributes = true;
        this.selectedClothingCode = category.code;
        this.loadCategory(category.code);
        this.getMandatoryAttributes();
      } else if (this.selectedCategory.next) {
        this.loadCategory(category.code);
        this.loadCategoryList();
        this.nextCategory(category.code);
      }
    }
  }

  getMandatoryAttributes() {
    var code = '';
    var subcategory = this.getCategory(this.selectedClothingCode).subCategories;
    if (this.mandatoryAttributeIndex < subcategory.length) {
      code = subcategory[this.mandatoryAttributeIndex].code;
      this.loadCategory(code);
      this.loadCategoryList();
      this.breadcrumbService.addBreadcrumb(
        code,
        subcategory[this.mandatoryAttributeIndex].name
      );
      this.mandatoryAttributeIndex++;
    } else {
      this.optionalCategory();
    }
  }

  inputSelected(input: string) {
    this.userInput = input;
    if (
      this.selectedCategory.next &&
      this.selectedCategory.key !== 'attributes'
    ) {
      this.setPrompt('user-input', this.userInput);
      this.optionalCategory();
    } else {
      this.setPrompt(this.selectedCategory.key, this.userInput);
      // this.getMandatoryAttributes();
    }
  }

  setPrompt(key: string, value: string) {
    if (key.length > 0 && value.length) {
      this.promptService.addToPrompt(key, value);
    }
  }

  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  optionalCategory() {
    this.promptService.showPrompt();
    if (this.selectedClothingCode === undefined) {
      this.selectedClothingCode =
        this.promptService.getKey('gender') === 'Male' ? 'Men' : 'Women';
    }
    this.router.navigate(['../', 'optional', this.selectedClothingCode], {
      relativeTo: this.route,
    });
  }

  previousCategory() {
    this.location.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.breadcrumbService.removeBreadcrumb();
  }
}
