import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { addTodo, getTodo } from '../state/todo/todo.action';
import { ToDo, ToDoState } from '../state/todo/todo.reducer';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  public todoInput: string = '';
  public todo$: Observable<ToDoState>;
  public todos: ToDo[] = [];
  public completedTodos: ToDo[] = [];
  public toDoSubscription: Subscription;

  constructor(private store: Store<{ todo: ToDoState }>) {
    this.todo$ = this.store.pipe(select('todo'));
  };

  ngOnInit(): void {
    console.log('this.todoList:', this.todos)

    this.toDoSubscription = this.todo$
      .pipe(map((x) => { 
        this.todos = x.todo.filter((t: ToDo) => !t.completed) 
        console.log('x.todo:', x.todo);
        this.completedTodos = x.todo.filter((t: ToDo) => t.completed) 
      }))
      .subscribe();

    this.store.dispatch(getTodo());
  }

  ngOnDestroy() {
    this.toDoSubscription.unsubscribe();
  }

  onAddTodo(): void {  
    if (this.todoInput.trim().length <=0) return 
    this.store.dispatch(addTodo({ title: this.todoInput.trim() }));
    this.todoInput = ""
  }
}
