import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo.effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),    
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ TodoEffects ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
