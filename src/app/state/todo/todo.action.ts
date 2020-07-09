import { createAction, props } from '@ngrx/store';

export enum TodoActionTypes {
    GET_TODO = '[Todo Page] GET_TODO',
    ADD_TODO = '[Todo Page] ADD_TODO',
    DELETE_TODO = '[Todo Page] DELETE_TODO',
    EDIT_TODO = '[Todo Page] EDIT_TODO',
    UPDATE_TODO = '[Todo Page] UPDATE_TODO',
    COMPLETE_TODO = '[Todo Page] COMPLETE_TODO'
}

export const getTodo = createAction(TodoActionTypes.GET_TODO)

export const addTodo = createAction(TodoActionTypes.ADD_TODO, props<{ title: string }>())

export const deleteTodo = createAction(TodoActionTypes.DELETE_TODO, props<{ id: number }>())

export const updateTodo = createAction(TodoActionTypes.UPDATE_TODO, props<{ id: number, title: string }>())

export const editTodo =  createAction(TodoActionTypes.EDIT_TODO, props<{ id: number }>())

export const completeTodo = createAction(TodoActionTypes.COMPLETE_TODO, props<{ id: number }>())
