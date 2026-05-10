import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  searchTerm: string = '';
  cartTotalItems: number = 0;
  isLoggedIn: boolean = false;
  userName: string = '';
  showSuggestions: boolean = false;
  suggestions: any[] = [];
  
  private allProducts: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateCartCount();
    this.checkLoginStatus();
    this.loadProducts();
    
    window.addEventListener('storage', () => {
      this.updateCartCount();
      this.checkLoginStatus();
    });
  }

  loadProducts(): void {
    // Les mêmes produits que dans catalog.ts
    this.allProducts = [
      { id: 1, name: 'Robe Bohème', price: 89, category: 'Robe', icon: '👗' },
      { id: 2, name: 'Robe Cache-Cœur', price: 79, category: 'Robe', icon: '👗' },
      { id: 3, name: 'Robe Portefeuille', price: 99, category: 'Robe', icon: '👗' },
      { id: 4, name: 'Sac Tote Cuir', price: 129, category: 'Sac', icon: '👜' },
      { id: 5, name: 'Sac Bandoulière', price: 79, category: 'Sac', icon: '👜' },
      { id: 6, name: 'Sac Panier', price: 59, category: 'Sac', icon: '👜' },
      { id: 7, name: 'Sandales à Talon', price: 89, category: 'Talon', icon: '👠' },
      { id: 8, name: 'Escarpins Classiques', price: 99, category: 'Talon', icon: '👠' },
      { id: 9, name: 'Mules à Talon', price: 79, category: 'Talon', icon: '👠' }
    ];
  }

  updateCartCount(): void {
    this.cartTotalItems = this.cartService.getTotalItems();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isLoggedIn = !!token;
    this.userName = user.nom || user.name || 'Client';
  }

  onSearchInput(): void {
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      this.suggestions = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(term)
      ).slice(0, 5);
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  searchProducts(): void {
    if (this.searchTerm.trim()) {
      this.showSuggestions = false;
      this.router.navigate(['/catalog'], { queryParams: { search: this.searchTerm } });
    }
  }

  selectSuggestion(product: any): void {
    this.searchTerm = product.name;
    this.showSuggestions = false;
    this.router.navigate(['/catalog'], { queryParams: { search: product.name } });
  }

  getIconForCategory(category: string): string {
    switch(category) {
      case 'Robe': return '👗';
      case 'Sac': return '👜';
      case 'Talon': return '👠';
      default: return '🛍️';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}