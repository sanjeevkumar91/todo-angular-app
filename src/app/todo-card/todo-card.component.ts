import { Component, Input } from '@angular/core';
import { Todo, TodoState } from '../state/todo/model';
import { Store } from '@ngrx/store';
import { deleteTodo, completeTodo, editTodo, updateTodo } from '../state/todo/action';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})

export class TodoCardComponent {
  @Input() todos: Todo[];
  public todoEditInput: string = '';
  constructor(private store: Store<TodoState>) {};

  onDeleteTodo(id: number): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  updateTodo(id: number) {
    if (this.todoEditInput.trim().length <= 0) return;
    this.store.dispatch(updateTodo({ id, title: this.todoEditInput.trim() }));
    this.todoEditInput = ""
  }

  onEditTodo(todo: Todo): void {
    const { id, title } = todo
    this.todoEditInput = title;
    this.store.dispatch(editTodo({ id }));
  }

  onToDoCompleteChange(todo: Todo): void {
    const { id, completed } = todo
    this.store.dispatch(completeTodo({ id, completed: !completed }));
  }
}
