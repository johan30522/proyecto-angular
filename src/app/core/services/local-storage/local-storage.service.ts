import { Injectable } from '@angular/core';
import { CONFIG } from '../../../config/index';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


    private readonly storagePrefix: string;
  
    constructor() {
      this.storagePrefix = CONFIG.storagePrefix;
    }
  
    public set(name: string, elem: any): void {
      localStorage.setItem(`${this.storagePrefix}-${name}`, JSON.stringify(elem));
    }
  
    public get(name: string, defaultValue: any): any {
      const item = localStorage.getItem(`${this.storagePrefix}-${name}`);
      if (!item) {
        return defaultValue;
      }
      return JSON.parse(item);
    }
  
    public delete(name: string): void {
      localStorage.removeItem(`${this.storagePrefix}-${name}`);
    }
  
    public deleteAll(): void {
      localStorage.clear();
    }
}
