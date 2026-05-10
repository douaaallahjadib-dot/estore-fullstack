import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }

  viewOrderDetail(order: any): void {
    this.selectedOrder = order;
  }
}