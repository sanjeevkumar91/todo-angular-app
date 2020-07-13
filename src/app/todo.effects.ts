import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from './todo.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { updateTodos, getTodos, addTodo, deleteTodo, updateTodo, completeTodo } from './state/todo/action'
import { Todo } from './state/todo/model';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getTodos),
      mergeMap(() => 
        this.todoService.getTodos()
          .pipe(
            map((todos: Todo[]) => updateTodos({ payload: todos })),
            catchError(() => EMPTY)
          )
      )
    )
  )

  addTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((action) => 
        this.todoService.addTodo(action.title)
          .pipe(
            map(() => addTodo(action)),
            catchError(() => EMPTY)
          )
      )
    )
  )

  updateTodos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateTodo),
      mergeMap((action) => 
        this.todoService.updateTodo(action.id, action.title)
          .pipe(
            map(() => updateTodo(action)),
            catchError(() => EMPTY)
          )
      )
    )
  )

  completeTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(completeTodo),
      mergeMap((action) => 
        this.todoService.completeTodo(action.id, action.completed)
          .pipe(
            map(() => completeTodo(action)),
            catchError(() => EMPTY)
          )
      )
    )
  )

  deleteTodo$ = createEffect(() => 
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap((action) => 
        this.todoService.deleteTodo(action.id)
          .pipe(
            map(() => deleteTodo({ id: action.id })),
            catchError(() => EMPTY)
          )
      )
    )
  )

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
