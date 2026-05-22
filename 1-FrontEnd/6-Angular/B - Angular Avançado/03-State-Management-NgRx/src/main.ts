import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { cartReducer } from './app/store/cart.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ cart: cartReducer })
  ]
}).catch(err => console.error(err));
