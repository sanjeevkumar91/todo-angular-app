import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { reducers } from '../state/index';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent, TodoCardComponent ],
      imports: [ StoreModule.forRoot({ todo: reducers.todo }), FormsModule ],
      providers: [
        { provide: Store }
      ]
    })
    .compileComponents();
  }));

  const addTodoItem = (item = 'Learn Angular') => {
    const todoInput: HTMLInputElement = hostElement.querySelector("#add-todo-input"); 
    const todoAddBtn: HTMLButtonElement = hostElement.querySelector("#add-todo-btn"); 
    todoInput.value = item;
    todoInput.dispatchEvent(new Event('input'));
    todoAddBtn.click();
    fixture.detectChanges();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
  });

  it('should create a todo component', () => {
    expect(component).toBeTruthy();
  });

  const getTodoCard = () => hostElement.querySelector(".card");

  it('should add a todo item', () => {
    addTodoItem();
    expect(getTodoCard().querySelector('.todo-container p').innerText).toBe('Learn Angular');
    expect(component.todos.length).toBe(1);
  });

  it('should not add a blank todo item', () => {
    addTodoItem('  ');
    expect(component.todos.length).toBe(0);
    expect(component.completedTodos.length).toBe(0);
  });

  it('should delete a todo item', () => {
    addTodoItem();
    expect(component.todos.length).toBe(1);
    const deleteBtn: HTMLImageElement = hostElement.querySelector(".card .todo-action-container .icon.delete");
    deleteBtn.click();
    expect(component.todos.length).toBe(0);
  });

  it('should edit a todo item', () => {
    addTodoItem();
    expect(component.todos.length).toBe(1);

    const editBtn: HTMLImageElement = getTodoCard().querySelector(".todo-action-container .icon.edit");
    editBtn.click();
    fixture.detectChanges();

    const editInput: HTMLInputElement = getTodoCard().querySelector('.todo-container input[type="text"]');
    editInput.value = 'Learn Angular 9';
    editInput.dispatchEvent(new Event('input'));
    const acceptBtn = getTodoCard().querySelector(".todo-action-container .icon.accept")
    acceptBtn.click();
    fixture.detectChanges();

    const modifiedTodoItem: HTMLElement = getTodoCard().querySelector('.todo-container p')
    expect(modifiedTodoItem.innerText).toBe('Learn Angular 9');
    expect(component.todos.length).toBe(1);
  });

  it('should complete a todo item', () => {
    addTodoItem();
    expect(component.todos.length).toBe(1);
    expect(component.completedTodos.length).toBe(0);

    const completeCheck: HTMLInputElement = getTodoCard().querySelector('.todo-container input[type="checkbox"]');
    completeCheck.click();

    expect(component.todos.length).toBe(0);
    expect(component.completedTodos.length).toBe(1);
  });
});
