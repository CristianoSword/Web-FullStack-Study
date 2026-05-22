import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../models/cart.models';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialCartState,
  
  on(CartActions.addProduct, (state, { product }) => {
    const existingIndex = state.items.findIndex(item => item.product.id === product.id);
    let newItems: CartItem[];

    if (existingIndex > -1) {
      newItems = state.items.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [...state.items, { product, quantity: 1 }];
    }

    return { ...state, items: newItems };
  }),

  on(CartActions.removeProduct, (state, { productId }) => {
    const existingItem = state.items.find(item => item.product.id === productId);
    if (!existingItem) return state;

    let newItems: CartItem[];
    if (existingItem.quantity > 1) {
      newItems = state.items.map(item => 
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      newItems = state.items.filter(item => item.product.id !== productId);
    }

    return { ...state, items: newItems };
  }),

  on(CartActions.clearCart, () => initialCartState)
);
