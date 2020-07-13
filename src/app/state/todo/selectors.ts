import { createSelector } from '@ngrx/store';
import { TodoState, Todo } from './model';

const selectTodos =  (state: TodoState): Todo[] => state.todo;

const selectActiveTodos = createSelector(selectTodos, (todos: Todo[]) => todos.filter((todo: Todo) => !todo.completed));

const selectCompletedTodos = createSelector(selectTodos, (todos: Todo[]) => todos.filter((todo: Todo) => todo.completed));

export { selectActiveTodos, selectCompletedTodos }
