import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  fetchTodos(): void {
    this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(data => data.slice(0, 10).map(item => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
          priority: 'medium' as const
        })))
      )
      .subscribe(todos => this.todosSubject.next(todos));
  }

  addTodo(todo: Todo): Observable<Todo> {
    const current = this.todosSubject.value;
    const maxId = current.length ? Math.max(...current.map(t => Number(t.id))) : 0;
    const newId = maxId + 1;

    const newTodo = { ...todo, id: newId };

    return this.http.post<Todo>(this.apiUrl, newTodo).pipe(
      tap(() => {
        this.todosSubject.next([...current, newTodo]);
      })
    );
  }

  updateTodo(updated: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${updated.id}`, updated).pipe(
      tap(() => {
        const current = this.todosSubject.value;
        const updatedList = current.map(todo =>
          todo.id === updated.id ? updated : todo
        );
        this.todosSubject.next(updatedList);
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.todosSubject.next(this.todosSubject.value.filter(todo => todo.id !== id));
      })
    );
  }
}