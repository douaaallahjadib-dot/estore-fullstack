import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileForm } from '../profile-form/profile-form';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileForm],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  user: any = null;
  userId: string = '';

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userId = this.user.id || this.user.userId || '1';
    }
  }
}