// import utils
import { makeAutoObservable } from 'mobx';

class PageStore {
  private _title: string;

  constructor(initialTitle: string = 'Dashboard') {
    this._title = initialTitle;
    makeAutoObservable(this);
  }

  get title(): string {
    return this._title;
  }

  setTitle(title: string): void {
    this._title = title;
  }
}

export const pageStoreInstance = new PageStore();
