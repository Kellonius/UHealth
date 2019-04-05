import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {

  facilityTypeSelectModel: string;
  insuranceSelectModel: string;
  procedureSelectModel: string;
  specialtySelectModel: string;

  constructor() { }

  ngOnInit() {
  }

}
