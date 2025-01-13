import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: boolean = false;

  showLoader(): void {
    this.isLoading = true;
  }

  hideLoader(): void {
    this.isLoading = false;
  }
 
}
