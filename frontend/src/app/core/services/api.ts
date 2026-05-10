import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  
  private apiUrl = 'http://localhost:8085/api'; // ← CHANGE CETTE LIGNE AVEC L'URL DE HIND

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // ========== AUTHENTIFICATION ==========
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  // ========== PRODUITS ==========
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  // ========== PANIER ==========
  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${userId}`, { headers: this.getHeaders() });
  }

  addToCart(productId: number, quantity: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, { productId, quantity, userId }, { headers: this.getHeaders() });
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cart/update`, { cartItemId, quantity }, { headers: this.getHeaders() });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/remove/${cartItemId}`, { headers: this.getHeaders() });
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/clear/${userId}`, { headers: this.getHeaders() });
  }

  // ========== COMMANDES ==========
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData, { headers: this.getHeaders() });
  }

  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/user/${userId}`, { headers: this.getHeaders() });
  }

  // ========== PROFIL ==========
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  updateUserProfile(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData, { headers: this.getHeaders() });
  }

  // ========== AVIS ==========
  getProductReviews(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews/product/${productId}`);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews`, reviewData, { headers: this.getHeaders() });
  }
}