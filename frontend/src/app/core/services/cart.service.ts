import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private storageKey = 'cart';

  constructor() {
    this.loadCart();
  }

  // Charger le panier depuis localStorage
  private loadCart(): void {
    if (typeof localStorage !== 'undefined') {
      const savedCart = localStorage.getItem(this.storageKey);
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
      }
    }
  }

  // Sauvegarder le panier dans localStorage
  private saveCart(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    }
  }

  // Récupérer tous les articles
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Récupérer le nombre total d'articles
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Récupérer le prix total
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Ajouter un produit au panier
  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => 
      item.productId === product.id || item.id === product.id
    );
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || product.images?.[0] || 'https://placehold.co/400x500/D4A373/white?text=Produit',
        category: product.category
      });
    }
    
    this.saveCart();
  }

  // Modifier la quantité
  updateQuantity(id: number, quantity: number): void {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  // Supprimer un article
  removeItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  // Vider tout le panier
  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }
}