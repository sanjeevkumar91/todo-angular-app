import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoCardComponent } from './todo-card.component';
import { reducers } from '../state/index';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Todo } from '../state/todo/model';

const mockData: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',
      completed: false,
      canEdit: false
    }
]

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCardComponent ],
      imports: [ 
        StoreModule.forRoot({ todo: reducers.todo }), 
        FormsModule 
      ],
      providers: [
        { provide: Store }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the todo item based on input data', () => {
    component.todos = mockData;
    fixture.detectChanges();
    const todoItems: HTMLElement[] = hostElement.querySelectorAll(".card"); 
    expect(todoItems.length).toBe(1);
  });
});
