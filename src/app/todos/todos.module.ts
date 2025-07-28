import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TodoFormComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TodoPageComponent }
    ]),
    
  ]
})
export class TodosModule { }
