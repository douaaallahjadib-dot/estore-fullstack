import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  product: any = null;
  quantity: number = 1;

  products = [
    { id: 1, name: 'Robe Pastel Pink', price: 520, category: 'Robe', image: 'assets/images/products/pastelpink.png', description: 'Robe maxi imprimé floral, tissu fluide et léger. Parfaite pour les journées ensoleillées.', sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'Rose Pastel', stock: 10 },
    { id: 2, name: 'Robe Mint', price: 380, category: 'Robe', image: 'assets/images/products/mint.png', description: 'Robe décontractée en coton menthe, fraîche et confortable pour l\'été.', sizes: ['XS', 'S', 'M', 'L', 'XL'], color: 'Menthe', stock: 15 },
    { id: 3, name: 'Robe Turquoise', price: 340, category: 'Robe', image: 'assets/images/products/turquois.png', description: 'Robe de plage turquoise, fluide et légère. Idéale pour la plage ou les vacances.', sizes: ['S', 'M', 'L'], color: 'Turquoise', stock: 8 },
    { id: 4, name: 'Robe Jaune', price: 360, category: 'Robe', image: 'assets/images/products/jaune.png', description: 'Robe jaune à nouer, parfaite pour l\'été. Style décontracté et élégant.', sizes: ['XS', 'S', 'M', 'L'], color: 'Jaune Soleil', stock: 12 },
    { id: 5, name: 'Robe Lavande', price: 590, category: 'Robe', image: 'assets/images/products/lavender.png', description: 'Robe cocktail lavande, élégante et raffinée. Parfaite pour les soirées.', sizes: ['S', 'M', 'L'], color: 'Lavande', stock: 5 },
    { id: 6, name: 'Sac Noir', price: 550, category: 'Sac', image: 'assets/images/products/sac-noir.svg', description: 'Sac en cuir noir, intemporel et chic. Grande capacité.', color: 'Noir', stock: 20 },
    { id: 7, name: 'Sac Beige', price: 480, category: 'Sac', image: 'assets/images/products/sac-beige.svg', description: 'Sac bandoulière beige, style décontracté et élégant.', color: 'Beige', stock: 18 },
    { id: 8, name: 'Sac Rose Gold', price: 780, category: 'Sac', image: 'assets/images/products/sac-rosegold.svg', description: 'Sac soirée scintillant, glamour et luxueux.', color: 'Rose Gold', stock: 6 },
    { id: 9, name: 'Sac Marron', price: 620, category: 'Sac', image: 'assets/images/products/sac-marron.svg', description: 'Sac en cuir marron, élégance intemporelle.', color: 'Marron', stock: 14 },
    { id: 10, name: 'Sac Blanc', price: 430, category: 'Sac', image: 'assets/images/products/sac-blanc.svg', description: 'Sac blanc épuré, chic et moderne.', color: 'Blanc', stock: 10 },
    { id: 11, name: 'Talon Noir', price: 350, category: 'Talon', image: 'assets/images/products/talon-noir.svg', description: 'Talon aiguille 10cm, incontournable de la garde-robe.', sizes: ['35', '36', '37', '38', '39', '40'], color: 'Noir', stock: 25 },
    { id: 12, name: 'Talon Beige', price: 380, category: 'Talon', image: 'assets/images/products/talon-beige.svg', description: 'Talon beige, hauteur 8cm. Élégant et polyvalent.', sizes: ['35', '36', '37', '38', '39', '40'], color: 'Beige', stock: 22 },
    { id: 13, name: 'Talon Rouge', price: 420, category: 'Talon', image: 'assets/images/products/talon-rouge.svg', description: 'Talon rouge verni, effet glamour assuré.', sizes: ['36', '37', '38', '39'], color: 'Rouge', stock: 8 },
    { id: 14, name: 'Talon Rose', price: 390, category: 'Talon', image: 'assets/images/products/talon-rose.svg', description: 'Talon rose tendance, hauteur 9cm.', sizes: ['35', '36', '37', '38', '39'], color: 'Rose', stock: 12 },
    { id: 15, name: 'Talon Doré', price: 520, category: 'Talon', image: 'assets/images/products/talon-dore.svg', description: 'Talon doré métallique, luxe absolu pour les grandes occasions.', sizes: ['36', '37', '38', '39', '40'], color: 'Doré', stock: 7 }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
  }

  increaseQuantity(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addToCart(this.product);
    }
    alert(`✅ ${this.quantity} x ${this.product.name} ajouté au panier !`);
  }
}