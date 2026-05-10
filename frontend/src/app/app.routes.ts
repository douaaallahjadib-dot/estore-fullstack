import { Routes } from '@angular/router';

// Import sans ".component" car tes fichiers n'ont pas cette extension
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Catalog } from './features/catalog/catalog/catalog';
import { Cart } from './features/cart/cart/cart';
import { Orders } from './features/orders/orders/orders';
import { Profile } from './features/profile/profile/profile';
import { ProductDetail } from './features/product/product-detail/product-detail';
import { Checkout } from './features/checkout/checkout/checkout';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'catalog', component: Catalog },
  { path: 'cart', component: Cart },
  { path: 'product/:id', component: ProductDetail },
  { path: 'checkout', component: Checkout },
  { path: 'orders', component: Orders },
  { path: 'profile', component: Profile },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalog' }
];