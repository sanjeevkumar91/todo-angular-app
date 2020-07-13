import { createAction, props } from '@ngrx/store';
import { Todo } from './model'

export enum TodoActionTypes {
    GET_TODOS = '[Todo Page] GET_TODOS',
    UPDATE_TODOS = '[Todo Page] UPDATE_TODOS',
    ADD_TODO = '[Todo Page] ADD_TODO',
    DELETE_TODO = '[Todo Page] DELETE_TODO',
    EDIT_TODO = '[Todo Page] EDIT_TODO',
    UPDATE_TODO = '[Todo Page] UPDATE_TODO',
    COMPLETE_TODO = '[Todo Page] COMPLETE_TODO'
}

export const getTodos = createAction(TodoActionTypes.GET_TODOS)

export const updateTodos = createAction(TodoActionTypes.UPDATE_TODOS, props<{ payload: Todo[] }>())

export const addTodo = createAction(TodoActionTypes.ADD_TODO, props<{ title: string }>())

export const deleteTodo = createAction(TodoActionTypes.DELETE_TODO, props<{ id: number }>())

export const updateTodo = createAction(TodoActionTypes.UPDATE_TODO, props<{ id: number, title: string }>())

export const editTodo =  createAction(TodoActionTypes.EDIT_TODO, props<{ id: number }>())

export const completeTodo = createAction(TodoActionTypes.COMPLETE_TODO, props<{ id: number, completed: boolean }>())
