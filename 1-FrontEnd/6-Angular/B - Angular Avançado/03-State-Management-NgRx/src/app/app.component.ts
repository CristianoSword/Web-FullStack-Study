import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductItem, CartItem } from './models/cart.models';
import { MOCK_PRODUCTS } from './models/mock-products';
import * as CartActions from './store/cart.actions';
import * as CartSelectors from './store/cart.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="store-wrapper">
      <header class="store-header">
        <div class="brand">
          <span class="brand-icon">⚡</span>
          <h1>AURA<span class="highlight">STORE</span></h1>
        </div>
        <div class="cart-trigger" (click)="toggleCart(true)">
          <span class="cart-icon">🛒</span>
          <span class="cart-badge-count">{{ cartCount$ | async }}</span>
        </div>
      </header>

      <main class="store-content">
        <!-- Products Grid Showcase -->
        <section class="products-section">
          <h2>Equipamentos Gamer Avançados</h2>
          <p class="section-desc">Performance extrema e latência zero para entusiastas digitais.</p>

          <div class="products-grid">
            @for (product of products; track product.id) {
              <div class="product-card">
                <div class="product-visual">
                  <span class="product-emoji">{{ product.imageUrl }}</span>
                  <span class="category-badge">{{ product.category }}</span>
                </div>
                
                <div class="product-info">
                  <h3 class="product-title">{{ product.name }}</h3>
                  <p class="product-desc">{{ product.description }}</p>
                  
                  <div class="product-footer">
                    <span class="product-price">R$ {{ product.price.toFixed(2) }}</span>
                    <button 
                      (click)="addToCart(product)" 
                      class="add-to-cart-btn"
                    >
                      Adicionar ⚡
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Dynamic Floating Drawer Sidebar (Cart State) -->
        <div [class]="['cart-drawer-overlay', isCartOpen ? 'open' : '']" (click)="toggleCart(false)"></div>
        <aside [class]="['cart-drawer', isCartOpen ? 'open' : '']">
          <div class="drawer-header">
            <h3>Seu Carrinho Gamer</h3>
            <button class="close-btn" (click)="toggleCart(false)">✕</button>
          </div>

          <div class="drawer-items">
            @for (item of cartItems$ | async; track item.product.id) {
              <div class="cart-drawer-item">
                <span class="item-visual">{{ item.product.imageUrl }}</span>
                <div class="item-details">
                  <h4>{{ item.product.name }}</h4>
                  <p class="item-pricing">
                    R$ {{ item.product.price.toFixed(2) }} x {{ item.quantity }}
                  </p>
                </div>
                <div class="item-controls">
                  <button (click)="decrementItem(item.product.id)" class="ctrl-btn">-</button>
                  <span class="qty">{{ item.quantity }}</span>
                  <button (click)="addToCart(item.product)" class="ctrl-btn">+</button>
                </div>
              </div>
            } @empty {
              <div class="empty-drawer-state">
                <span class="empty-icon">🎮</span>
                <p>Nenhum periférico gamer no carrinho.</p>
                <p class="empty-sub">Adicione itens para iniciar o setup perfeito.</p>
              </div>
            }
          </div>

          @if ((cartCount$ | async) || 0 > 0) {
            <div class="drawer-footer">
              <div class="total-row">
                <span>Total Estimado:</span>
                <span class="total-value">R$ {{ (cartTotal$ | async)?.toFixed(2) }}</span>
              </div>
              <div class="action-buttons">
                <button (click)="clearCart()" class="clear-cart-btn">Limpar Tudo 🗑️</button>
                <button (click)="checkout()" class="checkout-btn">Finalizar Compra 🚀</button>
              </div>
            </div>
          }
        </aside>
      </main>
    </div>
  `,
  styles: [`
    .store-wrapper {
      padding: 48px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .store-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 40px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-icon {
      font-size: 32px;
    }

    .brand h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .highlight {
      color: hsl(var(--primary));
    }

    .cart-trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      padding: 10px 20px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all 0.25s;
    }

    .cart-trigger:hover {
      background-color: var(--bg-surface-hover);
      border-color: var(--border-focus);
    }

    .cart-icon {
      font-size: 18px;
    }

    .cart-badge-count {
      font-size: 12px;
      font-weight: 800;
      background-color: hsl(var(--primary));
      color: var(--bg-app);
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    /* Products Section */
    .products-section h2 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 6px;
    }

    .section-desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 40px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 32px;
    }

    .product-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s;
    }

    .product-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-focus);
      box-shadow: var(--shadow-md);
    }

    .product-visual {
      height: 180px;
      background-color: var(--bg-surface-hover);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .product-emoji {
      font-size: 64px;
    }

    .category-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      font-size: 10px;
      font-weight: 700;
      background-color: var(--border);
      color: var(--text-secondary);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .product-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .product-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .product-desc {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 24px;
      flex-grow: 1;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .product-price {
      font-size: 18px;
      font-weight: 800;
      color: hsl(var(--primary));
      text-shadow: 0 0 10px hsla(var(--primary), 0.15);
    }

    .add-to-cart-btn {
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 10px 16px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .add-to-cart-btn:hover {
      background-color: hsl(var(--primary));
      color: var(--bg-app);
      border-color: hsl(var(--primary));
    }

    /* Drawer Sidebar */
    .cart-drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .cart-drawer-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .cart-drawer {
      position: fixed;
      top: 0;
      right: -450px;
      width: 450px;
      height: 100vh;
      background-color: var(--bg-surface);
      border-left: 1px solid var(--border);
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      display: flex;
      flex-direction: column;
      transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (max-width: 480px) {
      .cart-drawer {
        width: 100%;
        right: -100%;
      }
    }

    .cart-drawer.open {
      right: 0;
    }

    .drawer-header {
      padding: 32px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .drawer-header h3 {
      font-size: 18px;
      font-weight: 800;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 18px;
      cursor: pointer;
    }

    .drawer-items {
      flex-grow: 1;
      padding: 32px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-drawer-item {
      display: flex;
      align-items: center;
      gap: 16px;
      background-color: var(--bg-surface-hover);
      border: 1px solid var(--border);
      padding: 16px;
      border-radius: var(--radius-sm);
    }

    .item-visual {
      font-size: 28px;
    }

    .item-details {
      flex-grow: 1;
    }

    .item-details h4 {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .item-pricing {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .item-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ctrl-btn {
      background-color: var(--border);
      border: none;
      color: var(--text-primary);
      width: 24px;
      height: 24px;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
    }

    .ctrl-btn:hover {
      background-color: var(--border-focus);
    }

    .qty {
      font-size: 13px;
      font-weight: 700;
    }

    .empty-drawer-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      color: var(--text-muted);
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-sub {
      font-size: 12px;
      margin-top: 6px;
    }

    .drawer-footer {
      padding: 32px;
      border-top: 1px solid var(--border);
      background-color: var(--bg-app);
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      font-weight: 700;
    }

    .total-value {
      font-size: 20px;
      color: hsl(var(--primary));
    }

    .action-buttons {
      display: flex;
      gap: 16px;
    }

    .clear-cart-btn {
      background: none;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      padding: 14px;
      font-size: 13px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s;
    }

    .clear-cart-btn:hover {
      background-color: var(--bg-surface-hover);
      color: var(--text-primary);
    }

    .checkout-btn {
      flex-grow: 1;
      background: linear-gradient(135deg, hsl(var(--primary)), #2ad17a);
      border: none;
      color: var(--bg-app);
      padding: 14px;
      font-size: 13px;
      font-weight: 800;
      border-radius: var(--radius-sm);
      cursor: pointer;
      box-shadow: 0 4px 15px hsla(var(--primary), 0.25);
    }

    .checkout-btn:hover {
      opacity: 0.95;
    }
  `]
})
export class AppComponent {
  products: ProductItem[] = MOCK_PRODUCTS;
  isCartOpen = false;

  cartItems$: Observable<CartItem[]>;
  cartCount$: Observable<number>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartCount$ = this.store.select(CartSelectors.selectCartCount);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
  }

  toggleCart(isOpen: boolean) {
    this.isCartOpen = isOpen;
  }

  addToCart(product: ProductItem) {
    this.store.dispatch(CartActions.addProduct({ product }));
  }

  decrementItem(productId: string) {
    this.store.dispatch(CartActions.removeProduct({ productId }));
  }

  clearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  checkout() {
    alert('🌌 Compra processada de forma reativa pelo pipeline NgRx!');
    this.clearCart();
    this.toggleCart(false);
  }
}
