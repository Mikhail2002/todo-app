import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityLabelComponent } from './priority-label/priority-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';



@NgModule({
  declarations: [
    PriorityLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextFieldModule
  ],
  exports: [
    PriorityLabelComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextFieldModule
  ]
})
export class SharedModule { }
