import * as TodoActions from './todo.action';
import {
  createReducer,
  on,
  Action
} from '@ngrx/store';

export interface ToDo {
  id: number
  title: string
  completed: boolean
  canEdit: boolean
}

export interface ToDoState {
  todo: ToDo[]
}

const initialState: ToDoState = { todo: [] }

export const reducer = createReducer(
    initialState,
    on(
      TodoActions.getTodo, 
      (state) => state
    ),
    on(
      TodoActions.addTodo, 
      (state, { title }) => ({ todo: state.todo.concat({ id: state.todo.length + 1, title, completed: false, canEdit: false })})
    ),
    on(
      TodoActions.deleteTodo, 
      (state, { id }) => ({ todo: state.todo.filter((t: ToDo) => t.id != id) })
    ),
    on(
      TodoActions.editTodo, 
      (state, { id }) => ({ todo: state.todo.map((todo: ToDo) => ({ ...todo, canEdit: todo.id == id })) })
    ),
    on(
      TodoActions.updateTodo, 
      (state, { id, title }) => ({ todo: state.todo.map((todo: ToDo) => ({ ...todo, title: todo.id == id ? title : todo.title , canEdit: false })) })
    ),
    on(
      TodoActions.completeTodo, 
      (state, { id }) => ({ todo: state.todo.map((todo: ToDo) => todo.id == id ? { ...todo, completed: !todo.completed } : todo)})
    )
);

export function ToDoReducer(state: ToDoState, action: Action) {
  // console.log('state:', state);
  // console.log('action:', action);
  return reducer(state, action);
}
