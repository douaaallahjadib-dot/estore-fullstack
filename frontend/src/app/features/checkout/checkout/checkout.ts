import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  
  order = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  submitOrder(): void {
    if (!this.order.fullName || !this.order.email || !this.order.address) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Sauvegarder la commande
    const orderData = {
      ...this.order,
      items: this.cartItems,
      total: this.totalPrice,
      date: new Date(),
      orderNumber: 'HD-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    };
    
    // Sauvegarder dans localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Vider le panier
    this.cartService.clearCart();
    
    // Rediriger vers la confirmation
    this.router.navigate(['/orders']);
  }
}