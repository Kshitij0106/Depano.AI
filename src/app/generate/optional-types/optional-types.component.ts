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

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoute();
      }
    });
  }

  getRoute() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.type = params.get('type') || '';
      this.setCategory(this.type);
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

  setCategory(type: string) {
    this.selectedCategory = this.getCategory(type);
    if (this.selectedCategory.next) {
      this.optionalList = this.sortList(this.selectedCategory.optionalTypes);
    } else {
      this.optionalList = this.selectedCategory.subCategories;
    }
  }

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
    this.userOptionalInput = input;
    if (this.selectedCategory.next) {
      this.setPrompt('user-optional-input', this.userOptionalInput);
    } else {
      this.setPrompt(this.selectedCategory.key, this.userOptionalInput);
      this.previousCategory();
    }
    this.generate();
  }

  setPrompt(key: string, value: string) {
    if (key.length > 0 && value.length) {
      this.promptService.addToPrompt(key, value);
    }
  }

  generate() {
    this.router.navigate(['../../../', 'result'], {
      relativeTo: this.route,
    });
  }

  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  previousCategory() {
    this.location.back();
  }
}
