import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTodo, getTodos } from '../state/todo/action';
import { Todo, TodoState } from '../state/todo/model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectActiveTodos, selectCompletedTodos } from '../state/todo/selectors'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  public todoInput: string = '';
  public todo$: Observable<Todo[]>;
  public completedTodo$: Observable<Todo[]>;
  public todos: Todo[] = [];
  public completedTodos: Todo[] = [];
  public todosSubscription: Subscription;
  public completedTodosSubscription: Subscription;

  constructor(private store: Store<TodoState>) {
    this.todo$ = this.store.pipe(select(selectActiveTodos));
    this.completedTodo$ = this.store.pipe(select(selectCompletedTodos));
  };

  ngOnInit(): void {
    this.todosSubscription = this.todo$.subscribe(v => this.todos = v);
    this.completedTodosSubscription = this.completedTodo$.subscribe(v => this.completedTodos = v);
    this.store.dispatch(getTodos());
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
    this.completedTodosSubscription.unsubscribe();
  }

  onAddTodo(): void {  
    if (this.todoInput.trim().length <=0) return 
    this.store.dispatch(addTodo({ title: this.todoInput.trim() }));
    this.todoInput = ""
  }
}
