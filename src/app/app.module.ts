import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MockFormComponent } from './mock-form/mock-form.component';
import { MockFormService } from './mock-form/mock-form.service';
import { MockFieldComponent } from './mock-form/mock-field/mock-field.component';
import { OptionalFieldsComponent } from './mock-form/optional-fields/optional-fields.component';


@NgModule({
  declarations: [
    AppComponent,
    MockFormComponent,
    MockFieldComponent,
    OptionalFieldsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MockFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
