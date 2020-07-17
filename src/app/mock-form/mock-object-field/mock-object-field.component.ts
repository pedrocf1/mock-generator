import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mock-object-field',
  templateUrl: './mock-object-field.component.html',
  styleUrls: ['./mock-object-field.component.css']
})
export class MockObjectFieldComponent implements OnInit {

  @Input("mockForm") mockForm:any

  constructor() { }

  ngOnInit() {
    console.log("ASDASDASD", this.mockForm)
  }

}
