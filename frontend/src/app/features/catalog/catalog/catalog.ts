import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class Catalog {
  
  searchTerm: string = '';
  selectedFilter: string = 'all';
  selectedProduct: any = null;
  newReview = { rating: 5, comment: '' };
  
  products = [
    // ROBES
    { id: 1, name: 'Robe Bohème', price: 89, category: 'Robe', 
       images: ['https://images.pexels.com/photos/4947741/pexels-photo-4947741.jpeg'],
      description: 'Une robe noire intemporelle et sophistiquée, parfaite pour toutes les occasions avec  magnifique ceinture dorée.', 
      color: 'Beige', stock: 12, rating: 0, totalReviews: 0, reviews: [] },
    { id: 2, name: 'Robe Cache-Cœur', price: 79, category: 'Robe', 
      images: ['https://images.pexels.com/photos/6007299/pexels-photo-6007299.jpeg'],
      description: 'obe longue est confectionnée dans un tissu fluide de couleur bleu nuit profond. Elle est ornée d’un imprimé floral .', 
      color: 'Rose', stock: 8, rating: 0, totalReviews: 0, reviews: [] },
    { id: 3, name: 'Robe Portefeuille', price: 99, category: 'Robe', 
   
      images:  ['https://images.pexels.com/photos/31649562/pexels-photo-31649562.jpeg'],
      description: 'Robe portefeuille en soie couleur sable.', 
      color: 'Sable', stock: 15, rating: 0, totalReviews: 0, reviews: [] },
    
    // SACS
    { id: 4, name: 'Sac Tote Cuir', price: 129, category: 'Sac', 
      images: ['https://images.pexels.com/photos/18458794/pexels-photo-18458794.jpeg'],
      description: 'Sac tote en cuir végétal couleur naturelle.', 
      color: 'Marron', stock: 10, rating: 0, totalReviews: 0, reviews: [] },
    { id: 5, name: 'Sac Bandoulière', price: 79, category: 'Sac', 
      images: ['https://images.pexels.com/photos/23223830/pexels-photo-23223830.jpeg'],
      description: 'Petit sac bandoulière en lin beige.', 
      color: 'Beige', stock: 18, rating: 0, totalReviews: 0, reviews: [] },
    { id: 6, name: 'Sac Panier', price: 59, category: 'Sac', 
      images: ['https://images.pexels.com/photos/22434764/pexels-photo-22434764.jpeg'],
      description: 'Un magnifique sac de couleur bordeaux profond, à la fois chic et pratique. Sa bandoulière courte.', 
      color: 'Naturel', stock: 25, rating: 0, totalReviews: 0, reviews: [] },
    
    // TALONS
    { id: 7, name: 'Sandales à Talon', price: 89, category: 'Talon', 
      images: ['https://images.pexels.com/photos/27113458/pexels-photo-27113458.jpeg'],
      description: 'Sandales à talon bloc 6cm, couleur foochia.', 
      color: 'Beige', stock: 14, rating: 0, totalReviews: 0, reviews: [] },
    { id: 8, name: 'Escarpins Classiques', price: 99, category: 'Talon', 
       images: ['https://images.pexels.com/photos/27204296/pexels-photo-27204296.jpeg'],
      description: 'Escarpins en cuir véritable, talon 7cm.', 
      color: 'Noir', stock: 20, rating: 0, totalReviews: 0, reviews: [] },
    { id: 9, name: 'Mules à Talon', price: 79, category: 'Talon', 
      images: ['https://images.pexels.com/photos/27100521/pexels-photo-27100521.jpeg'],
      description: 'Des escarpins élégants de couleur bordeaux, rehaussés par un motif original inspiré du pelage dutigre.', 
      color: 'Rose', stock: 16, rating: 0, totalReviews: 0, reviews: [] }
  ];

  filteredProducts: any[] = [];

  constructor(private cartService: CartService) {
    this.filteredProducts = this.products;
    this.loadRatings();
    this.loadAllReviews();
  }

  filterProducts(category: string): void {
    this.selectedFilter = category;
    this.searchProducts();
  }

  searchProducts() {
    let results = this.products;
    if (this.searchTerm) {
      results = results.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    if (this.selectedFilter !== 'all') {
      results = results.filter(p => p.category === this.selectedFilter);
    }
    this.filteredProducts = results;
  }

  getProductsByCategory(category: string) {
    if (this.selectedFilter !== 'all' && this.selectedFilter !== category) return [];
    return this.filteredProducts.filter(p => p.category === category);
  }

  // OUVRIRE LA MODALE
  openModal(product: any) {
    this.selectedProduct = { ...product };
    this.loadProductReviews(this.selectedProduct);
    this.newReview = { rating: 5, comment: '' };
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  // FERMER LA MODALE
  closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart({
      id: product.id, name: product.name, price: product.price,
      quantity: 1, image: product.images[0], category: product.category
    });
    alert(`✅ ${product.name} ajouté au panier !`);
    this.closeModal();
  }

  getTotalCartPrice(): number {
    return this.cartService.getTotalPrice();
  }

  rateProduct(product: any, rating: number): void {
    product.rating = rating;
    if (!product.totalReviews) product.totalReviews = 1;
    else product.totalReviews++;
    const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    ratings[product.id] = { rating, totalReviews: product.totalReviews };
    localStorage.setItem('productRatings', JSON.stringify(ratings));
    alert(`⭐ Vous avez noté ${product.name} : ${rating}/5 ⭐`);
  }

  loadRatings(): void {
    const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    this.products.forEach(p => {
      if (ratings[p.id]) {
        p.rating = ratings[p.id].rating;
        p.totalReviews = ratings[p.id].totalReviews;
      }
    });
  }

  getStars(rating: number): string {
    return '⭐'.repeat(rating);
  }

  loadAllReviews(): void {
    const saved = JSON.parse(localStorage.getItem('products') || '{}');
    this.products.forEach(p => {
      if (saved[p.id]) {
        p.rating = saved[p.id].rating || 0;
        p.totalReviews = saved[p.id].totalReviews || 0;
        p.reviews = saved[p.id].reviews || [];
      } else p.reviews = [];
    });
  }

  loadProductReviews(p: any): void {
    const saved = JSON.parse(localStorage.getItem('products') || '{}');
    if (saved[p.id]) {
      p.rating = saved[p.id].rating || 0;
      p.totalReviews = saved[p.id].totalReviews || 0;
      p.reviews = saved[p.id].reviews || [];
    } else p.reviews = [];
  }

  addReview(): void {
    if (!this.newReview.comment.trim()) {
      alert('Veuillez écrire un commentaire');
      return;
    }
    if (!this.selectedProduct) return;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = user.nom || user.name || 'Client';
    
    const review = {
      id: Date.now(),
      userName: userName,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
      date: new Date()
    };
    
    if (!this.selectedProduct.reviews) this.selectedProduct.reviews = [];
    this.selectedProduct.reviews.push(review);
    
    const total = this.selectedProduct.reviews.reduce((s: number, r: any) => s + r.rating, 0);
    this.selectedProduct.rating = total / this.selectedProduct.reviews.length;
    this.selectedProduct.totalReviews = this.selectedProduct.reviews.length;
    
    const all = JSON.parse(localStorage.getItem('products') || '{}');
    all[this.selectedProduct.id] = {
      rating: this.selectedProduct.rating,
      totalReviews: this.selectedProduct.totalReviews,
      reviews: this.selectedProduct.reviews
    };
    localStorage.setItem('products', JSON.stringify(all));
    
    this.newReview = { rating: 5, comment: '' };
    alert('✅ Votre avis a été ajouté !');
  }
}