import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  
  user = {
    nom: '',
    email: '',
    password: ''
  };
  
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    // Vérifier que tous les champs sont remplis
    if (!this.user.nom || !this.user.email || !this.user.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    
    // Vérifier que les mots de passe correspondent
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }
    
    // Vérifier que le mot de passe est assez long
    if (this.user.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Simuler l'inscription
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Vérifier si l'email existe déjà
      const emailExists = users.find((u: any) => u.email === this.user.email);
      if (emailExists) {
        this.errorMessage = 'Cet email est déjà utilisé';
        this.isLoading = false;
        return;
      }
      
      // Ajouter le nouvel utilisateur
      const newUser = {
        id: Date.now(),
        nom: this.user.nom,
        email: this.user.email,
        password: this.user.password,
        role: 'USER'
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      this.successMessage = '✅ Compte créé avec succès ! Redirection...';
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      
      this.isLoading = false;
    }, 1000);
  }
}