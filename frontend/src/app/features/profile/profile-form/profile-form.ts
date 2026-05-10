import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.css']
})
export class ProfileForm implements OnInit {
  @Input() user: any = null;
  @Input() userId: string = '';
  
  formData = {
    nom: '',
    email: '',
    adresse: '',
    telephone: ''
  };
  
  message: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    if (this.user) {
      this.formData = {
        nom: this.user.nom || '',
        email: this.user.email || '',
        adresse: this.user.adresse || '',
        telephone: this.user.telephone || ''
      };
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.message = '✅ Profil mis à jour !';
      localStorage.setItem('user', JSON.stringify(this.formData));
      setTimeout(() => this.message = '', 3000);
      this.isLoading = false;
    }, 1000);
  }
}
