import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from './constants'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = SERVER_URL + '/api/todo';
  }

  getTodos() {
    return this.http.get(this.baseUrl);
  }

  addTodo(todo: string) {
    return this.http.post(this.baseUrl, { title: todo });
  }

  updateTodo(id: number, todo: string) {
    const updateUrl = this.baseUrl + `/${id}/`;
    return this.http.put(updateUrl, { title: todo });
  }

  completeTodo(id: number, completeStatus: boolean) {
    const updateUrl = this.baseUrl + `/${id}/`;
    return this.http.put(updateUrl, { completed: completeStatus });
  }

  deleteTodo(id: number) {
    const deleteUrl = this.baseUrl + `/${id}/`;
    return this.http.delete(deleteUrl);
  }
}
