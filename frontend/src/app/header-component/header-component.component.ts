import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from '../Services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private breadCrumbService: BreadCrumbService, private router: Router) { }

  ngOnInit() {
  }

  getThisBread() {
    return this.breadCrumbService.breadcrumbs;
  }

  navigate(breadcrumb: string) {
    if (breadcrumb.toLowerCase() === "home"){
      this.router.navigateByUrl("/");
      this.breadCrumbService.breadcrumbs = ["Home"]
    }
  }

}
