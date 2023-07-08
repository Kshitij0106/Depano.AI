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
export class CategoryComponent implements OnInit {
  private category: string = '';
  private selectedCategory!: Category;
  private selectedClothingCode!: string;
  private userInput: string = '';
  categoryLists: Subcategory[] = [];
  optionalToSkip: boolean = false;
  private mandatoryAttributeIndex = 0;
  private gettingAttributes = false;

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

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoute();
      }
    });
    // this.breadcrumbService.abc.subscribe((code) => {
    //   if (this.selectedCategory.key !== 'attributes') {
    //     this.gettingAttributes = false;
    //     this.mandatoryAttributeIndex = 0;
    //   } else {
    //     this.gettingAttributes = true;
    //     this.getMandatoryAttributes();
    //   }
    // });
  }

  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (this.category === '' || this.category !== params.get('category')) {
        this.category = params.get('category') || '';
        if (!this.gettingAttributes) {
          this.setCategory(this.category);
        }
      }
    });
  }

  getCategory(category: string) {
    if (this.promptService.getKey('gender') === 'Male') {
      return this.menCategoryService.getCategory(category) as Category;
    } else if (this.promptService.getKey('gender') === 'Female') {
      return this.womenCategoryService.getCategory(category) as Category;
    }
    return {} as Category;
  }

  setCategory(category: string) {
    this.selectedCategory = this.getCategory(category);
    if (this.selectedCategory.key === 'attributes') {
      this.getMandatoryAttributes();
    } else {
      this.categoryLists = this.selectedCategory.subCategories;
    }
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
      this.categoryLists = newCategoryList.sort();
    }
  }

  categorySelected(category: Subcategory) {
    this.setPrompt(this.selectedCategory.key, category.prompt);
    if (
      this.selectedCategory.next &&
      this.selectedCategory.key !== 'attributes'
    ) {
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      this.nextCategory(category.code);
      this.selectedClothingCode = category.code;
    } else {
      this.getMandatoryAttributes();
    }
  }

  getMandatoryAttributes() {
    this.gettingAttributes = true;
    var code = '';
    var subcategory = this.selectedCategory.subCategories;
    if (this.mandatoryAttributeIndex < subcategory.length) {
      code = subcategory[this.mandatoryAttributeIndex].code;
      this.nextCategory(code);
      this.breadcrumbService.addBreadcrumb(
        code,
        subcategory[this.mandatoryAttributeIndex].name
      );
      this.categoryLists = this.getCategory(code).subCategories;
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
      this.getMandatoryAttributes();
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
