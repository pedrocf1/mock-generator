import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MockFormComponent } from './mock-form/mock-form.component';
import { MockFormService } from './mock-form/mock-form.service';
import { MockObjectFieldComponent } from './mock-form/mock-object-field/mock-object-field.component';

@NgModule({
  declarations: [
    AppComponent,
    MockFormComponent,
    MockObjectFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [MockFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
