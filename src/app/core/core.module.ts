import { NgModule } from '@angular/core';
import { TodoService } from './services/todo.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [TodoService]
})
export class CoreModule { }
