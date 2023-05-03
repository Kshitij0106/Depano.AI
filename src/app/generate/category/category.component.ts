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
  category: string = '';
  selectedCategory!: Category;
  categoryLists: Subcategory[] = [];
  userInput: string = '';

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
    });
    this.getCategoryList();
  }

  getCategoryList() {
    if (this.promptService.getKey('gender') === 'Men') {
      this.selectedCategory = this.menCategoryService.getCategory(
        this.category
      ) as Category;
    } else if (this.promptService.getKey('gender') === 'Women') {
      this.selectedCategory = this.womenCategoryService.getCategory(
        this.category
      ) as Category;
    }
    this.categoryLists = this.selectedCategory.subCategories;
  }

  categorySelected(category: Subcategory) {
    if (this.selectedCategory.next) {
      this.breadcrumbService.addBreadcrumb(category.code, category.name);
      this.nextCategory(category.code);
    } else {
      this.previousCategory();
    }
  }

  inputSelected(input: string) {
    this.userInput = input;
    this.generate();
  }

  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
  }

  previousCategory() {
    this.location.back();
  }

  generate() {
    this.router.navigate(['../../', 'result'], {
      relativeTo: this.route,
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.breadcrumbService.removeBreadcrumb();
  }
}
