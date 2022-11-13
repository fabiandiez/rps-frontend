import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string | undefined {
    const value = localStorage.getItem(key);
    return value ? value : undefined;
  }

}
