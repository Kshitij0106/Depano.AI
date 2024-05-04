import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

export interface breadcrumb {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbList: breadcrumb[] = [];

  constructor() {}

  /**
   * Add new breadcrumb to the list.
   * @param code - The code of the selected category.
   * @param name - The name of the selected category.
   */
  addBreadcrumb(code: string, name: string) {
    this.breadcrumbList.push({ key: code, value: name });
  }

  /**
   * Removes the last breadcrumb from the list.
   */
  removeBreadcrumb() {
    this.breadcrumbList.pop();
  }

  /**
   * Empty the breadcrumb list.
   */
  emptyBreadcrumbList() {
    this.breadcrumbList = [];
  }

  /**
   * A getter that retrieves the breadcrumb list from the breadcrumb service.
   * @returns {breadcrumb[]} - An array of breadcrumb items representing the current navigation path.
   */
  getBreadcrumbs(): breadcrumb[] {
    return this.breadcrumbList;
  }

  /**
   * Creating a new breadcrumb list till that selected category code.
   * @param {string} code - The code of the selected category to navigate back to.
   */
  createNewList(code: string) {
    let list: breadcrumb[] = [];
    for (let index in this.breadcrumbList) {
      if (this.breadcrumbList[index].key === code) {
        list.push({
          key: this.breadcrumbList[index].key,
          value: this.breadcrumbList[index].value,
        });
        break;
      }
      list.push({
        key: this.breadcrumbList[index].key,
        value: this.breadcrumbList[index].value,
      });
    }
    this.breadcrumbList = list;
  }
}
