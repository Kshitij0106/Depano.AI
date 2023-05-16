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
  private userInput: string = '';
  categoryLists: Subcategory[] = [];

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
  }

  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category') || '';
      this.setCategory(this.category);
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
    this.categoryLists = this.selectedCategory.subCategories;
  }

  onSkip() {
    if (this.selectedCategory.key === 'attributes') {
      this.optionalCategory();
    } else {
      let newCategoryList: Subcategory[] = [];
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
        let subCat = this.categoryLists;
        for (let i = 0; i < subCat.length; i++) {
          let selCat = this.getCategory(subCat[i].code);
          if (selCat && selCat.next) {
            for (let j = 0; j < selCat.subCategories.length; j++) {
              newCategoryList.push(selCat.subCategories[j]);
            }
          }
        }
      }
      this.categoryLists = newCategoryList;
    }
  }

  // randomNumber(min: number, max: number) {
  //   let number = Math.ceil(Math.random() * (max - min) + min);
  //   if (this.numbers.includes(number)) {
  //     this.randomNumber(min, max);
  //   } else if (this.numbers.length <= 0 || !this.numbers.includes(number)) {
  //     this.numbers.push(number);
  //   }
  //   return number;
  // }

  categorySelected(category: Subcategory) {
    this.setPrompt(this.selectedCategory.key, category.prompt);
    if (this.selectedCategory.next) {
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      this.nextCategory(category.code);
    } else {
      this.previousCategory();
    }
  }

  inputSelected(input: string) {
    this.userInput = input;
    if (this.selectedCategory.next) {
      this.setPrompt('user-input', this.userInput);
      this.optionalCategory();
    } else {
      this.setPrompt(this.selectedCategory.key, this.userInput);
      this.previousCategory();
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
    this.router.navigate(['../', 'optional', this.category], {
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
