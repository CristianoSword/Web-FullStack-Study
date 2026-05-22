export interface ProductItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}
