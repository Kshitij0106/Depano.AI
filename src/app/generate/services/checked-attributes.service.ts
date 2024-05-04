import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckedAttributesService {
  public checkedAttributesList: Map<string, boolean> = new Map();

  constructor() {}

  /**
   * Adds the selected attribute to the list.
   * @param {string} code - The attribute selected by the user.
   * @param {boolean} checked - If attribute is selected or not.
   */
  public addSelectedAttribute(code: string, checked: boolean) {
    this.checkedAttributesList.set(code, checked);
  }

  /**
   * Retrieves the data of the attribute from the list if it is present.
   * @param {string} code - The attribute to be checked.
   */
  public getAttribute(code: string) {
    if (this.checkedAttributesList.has(code)) {
      return this.checkedAttributesList.get(code);
    } else {
      return false;
    }
  }

  public emptyCheckedAttributesList() {
    this.checkedAttributesList = new Map();
  }
}
