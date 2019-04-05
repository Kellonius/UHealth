import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zipcode-component',
  templateUrl: './zipcode-component.component.html',
  styleUrls: ['./zipcode-component.component.scss']
})
export class ZipcodeComponentComponent implements OnInit {

  zipCode: number = 33136;

  constructor() { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.zipCode = event.target.value;
  }

}
