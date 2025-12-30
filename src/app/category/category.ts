import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {


}
