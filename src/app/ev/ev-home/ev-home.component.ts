import { Component,OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-ev-home',
  templateUrl: './ev-home.component.html',
  styleUrls: ['./ev-home.component.css']
})
export class evHomeComponent implements OnInit {
  

  constructor(private router: Router) {}
  sideBarOpen = false;
 
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sideBarOpen = false;
      }
    });

  }
  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;

  }
}
