import { createAction, props } from '@ngrx/store';
import { ProductItem } from '../models/cart.models';

export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: ProductItem }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ productId: string }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart'
);
