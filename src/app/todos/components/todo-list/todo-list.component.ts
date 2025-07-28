import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() update = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<number>();
}
