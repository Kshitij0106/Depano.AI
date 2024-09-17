import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckedAttributesService {
  private checkedAttributesList: Map<string, string> = new Map();

  constructor() {}

  /**
   * Adds the selected attribute to the list.
   * @param {string} code - The attribute selected by the user.
   * @param {string} value - The value of the attribute selected by the user.
   */
  public addSelectedAttribute(code: string, value: string) {
    this.checkedAttributesList.set(code, value);
  }

  /**
   * Removes the selected attribute from the list.
   * @param {string} code - The attribute selected by the user.
   */
  public removeSelectedAttribute(code: string) {
    this.checkedAttributesList.delete(code);
  }

  /**
   * Checks whether the selected attribute is in the list or not.
   * @param {string} code - The attribute selected by the user.
   */
  public hasAttribute(code: string) {
    return this.checkedAttributesList.has(code);
  }

  /**
   * Retrieves the value of the attribute from the list if it is present.
   * @param {string} code - The attribute to be checked.
   */
  public getAttributeValue(code: string): string {
    return this.checkedAttributesList.has(code)
      ? this.checkedAttributesList.get(code) || ''
      : '';
  }

  /**
   * Empties  the list.
   */
  public emptyCheckedAttributesList() {
    this.checkedAttributesList = new Map();
  }
}
