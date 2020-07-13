import * as TodoActions from './action';
import { Todo } from './model'
import {
  createReducer,
  on,
  Action
} from '@ngrx/store';

const initialState: Todo[] = []

export const reducer = createReducer(
    initialState,
    on(
      TodoActions.getTodos, 
      (state) => state
    ),
    on(
      TodoActions.updateTodos, 
      (_, props) => props.payload
    ),
    on(
      TodoActions.addTodo, 
      (state, { title }) => [...state, { id: state.length + 1, title, completed: false, canEdit: false }]
    ),
    on(
      TodoActions.deleteTodo, 
      (state, { id }) => state.filter((t: Todo) => t.id != id)
    ),
    on(
      TodoActions.editTodo, 
      (state, { id }) => state.map((todo: Todo) => ({ ...todo, canEdit: todo.id == id }))
    ),
    on(
      TodoActions.updateTodo, 
      (state, { id, title }) => state.map((todo: Todo) => ({ ...todo, title: todo.id == id ? title : todo.title , canEdit: false }))
    ),
    on(
      TodoActions.completeTodo, 
      (state, { id, completed }) => state.map((todo: Todo) => todo.id == id ? { ...todo, completed } : todo)
    )
);

export function ToDoReducer(state: Todo[], action: Action) {
  // console.log('state:', state);
  // console.log('action:', action);
  return reducer(state, action);
}
