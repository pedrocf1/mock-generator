import { Component, OnInit } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { MockField } from './model/mock-field';
import { MockBody } from './model/mock-body';


@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {

  mockBody:MockBody = new MockBody(null)

  ngOnInit(): void {
    setInterval(() => {
      console.log("mockField", this.mockBody)
    }, 5000);
  }


  addField(){
    this.mockBody.fields.push(new MockField(null))
  }

}
