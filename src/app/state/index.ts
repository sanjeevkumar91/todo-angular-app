import { ActionReducerMap } from '@ngrx/store';
import { ToDoReducer } from './todo/reducer'
import { TodoState } from './todo/model'

export const reducers: ActionReducerMap<TodoState> = {
    todo: ToDoReducer
}
