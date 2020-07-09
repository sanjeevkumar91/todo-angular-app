import { Component, Input } from '@angular/core';
import { ToDo, ToDoState } from '../state/todo/todo.reducer';
import { Store } from '@ngrx/store';
import { deleteTodo, completeTodo, editTodo, updateTodo } from '../state/todo/todo.action';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})

export class TodoCardComponent {
  @Input() todos: ToDo[];
  public todoEditInput: string = '';
  constructor(private store: Store<{ todo: ToDoState }>) {};

  onDeleteTodo(id: number): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  updateTodo(id: number) {
    if (this.todoEditInput.trim().length <= 0) return;
    this.store.dispatch(updateTodo({ id, title: this.todoEditInput.trim() }));
    this.todoEditInput = ""
  }

  onEditTodo(todo: ToDo): void {
    const { id, title } = todo
    this.todoEditInput = title;
    this.store.dispatch(editTodo({ id }));
  }

  onToDoCompleteChange(id: number): void {
    this.store.dispatch(completeTodo({ id }));
  }
}
