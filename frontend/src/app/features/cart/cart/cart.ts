import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    window.addEventListener('storage', () => this.loadCart());
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(id: number, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(id);
    } else {
      this.cartService.updateQuantity(id, quantity);
      this.loadCart();
    }
  }

  removeItem(id: number): void {
    if (confirm('🗑️ Supprimer cet article du panier ?')) {
      this.cartService.removeItem(id);
      this.loadCart();
    }
  }

  clearCart(): void {
    if (confirm('⚠️ Vider tout le panier ? Cette action est irréversible.')) {
      this.cartService.clearCart();
      this.loadCart();
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  getIcon(category: string): string {
    switch(category) {
      case 'Robe': return '👗';
      case 'Sac': return '👜';
      case 'Talon': return '👠';
      default: return '🛍️';
    }
  }
}