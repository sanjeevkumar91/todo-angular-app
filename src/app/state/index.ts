import { ActionReducerMap } from '@ngrx/store';
import { ToDoReducer, ToDo, ToDoState } from './todo/todo.reducer'
    
export interface ReducerState {
    todo: ToDoState
}

export const reducers: ActionReducerMap<ReducerState> = {
    todo: ToDoReducer
}

  