import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from '../../../core/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnChanges{
  @Input() todo: Todo = { id: 0, title: '', completed: false, priority: 'medium' };
  @Input() isEdit = false;
  @Output() save = new EventEmitter<Todo>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      priority: ['', [Validators.required, Validators.pattern(/^(high|medium|low)$/)]]
    });
  }

  ngOnChanges(): void {
    if (this.todo) {
    this.form.patchValue({
      title: this.todo.title || '',
      priority: this.isEdit ? this.todo.priority : ''
    });
  }
  }

  handleSubmit(): void {
    if (this.form.invalid) return;

    const newTodo: Todo = {
      ...this.todo,
      ...this.form.value
    };

    this.save.emit(newTodo);
    this.form.reset({ title: '', priority: '' });
  }
}
