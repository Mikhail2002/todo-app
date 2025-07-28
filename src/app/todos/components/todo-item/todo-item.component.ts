import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<number>();
}
