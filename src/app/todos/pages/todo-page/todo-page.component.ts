import { Component, OnDestroy, OnInit } from '@angular/core';
import { Priority, Todo } from '../../../core/models/todo.model';
import { TodoService } from '../../../core/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  allTodos: Todo[] = [];
  todos: Todo[] = [];
  currentTodo: Todo = {
    id: 0,
    title: '',
    completed: false,
    priority: 'medium'
  };
  editMode = false;

  private _filter: 'all' | 'completed' | 'incomplete' = 'all';
  private _sortByPriority: 'none' | 'asc' | 'desc' = 'none';

  get filter() {
    return this._filter;
  }
  set filter(value: 'all' | 'completed' | 'incomplete') {
    this._filter = value;
    this.applyFilterAndSort();
  }

  get sortByPriority() {
    return this._sortByPriority;
  }
  set sortByPriority(value: 'none' | 'asc' | 'desc') {
    this._sortByPriority = value;
    this.applyFilterAndSort();
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription = this.todoService.todos$.subscribe(todos => {
      this.allTodos = todos;
      this.applyFilterAndSort();
    });
    this.todoService.fetchTodos();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  applyFilterAndSort(): void {
    let filtered = [...this.allTodos];

    if (this.filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (this.filter === 'incomplete') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    const priorityOrder: Record<Priority, number> = {
      high: 1,
      medium: 2,
      low: 3
    };

    if (this.sortByPriority === 'asc') {
      filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (this.sortByPriority === 'desc') {
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    this.todos = filtered;
  }

  onSave(todo: Todo) {
    if (this.editMode) {
      this.todoService.updateTodo(todo).subscribe({
        next: () => this.resetForm(),
        error: err => console.error('Update error:', err)
      });
    } else {
      const newTodo: Todo = {
        ...todo,
        id: Date.now(),
        completed: false
      };
      this.todoService.addTodo(newTodo).subscribe({
        next: () => this.resetForm(),
        error: err => console.error('Add error:', err)
      });
    }
  }

  resetForm() {
    this.currentTodo = {
      id: 0,
      title: '',
      completed: false,
      priority: 'medium'
    };
    this.editMode = false;
  }

  onUpdate(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      error: err => console.error('Update error:', err)
    });
  }

  onEdit(todo: Todo) {
    this.currentTodo = { ...todo };
    this.editMode = true;
  }

  onDelete(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      error: err => console.error('Delete error:', err)
    });
  }
}