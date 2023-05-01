import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { Category } from '../category';
import { PromptService } from '../service/prompt.service';
import { MenCategoryService } from '../service/data/men-category.service';
import { Categories } from '../categories';
import { WomenCategoryService } from '../service/data/women-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: string = '';
  selectedCategory!: Categories;
  categoryLists: Category[] = [];
  userInput: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menCategoryService: MenCategoryService,
    private womenCategoryService: WomenCategoryService,
    private promptService: PromptService
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
    if (this.promptService.getKey('gender') === 'men') {
      this.selectedCategory = this.menCategoryService.getCategory(
        this.category
      ) as Categories;
    } else if (this.promptService.getKey('gender') === 'women') {
      this.selectedCategory = this.womenCategoryService.getCategory(
        this.category
      ) as Categories;
    }
    if (this.selectedCategory.next) {
      this.categoryLists = this.selectedCategory.categories;
    }
  }

  categorySelected(category: string) {
    this.nextCategory(category);
  }

  inputSelected(input: string) {
    this.userInput = input;
    this.generate();
  }

  nextCategory(category: string) {
    this.router.navigate(['../', category], {
      relativeTo: this.route,
    });
    //.replace(/\s/g, '')
  }

  generate() {
    this.router.navigate(['../../', 'result'], {
      relativeTo: this.route,
    });
  }
}
