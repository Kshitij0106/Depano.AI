import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface breadcrumb {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbList: breadcrumb[] = [];
  public abc = new BehaviorSubject<string>('');

  constructor() {}

  addBreadcrumb(code: string, name: string) {
    this.breadcrumbList.push({ key: code, value: name });
  }

  removeBreadcrumb() {
    this.breadcrumbList.pop();
  }

  emptyBreadcrumbList() {
    this.breadcrumbList = [];
  }

  getBreadcrumbs() {
    return this.breadcrumbList;
  }

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
