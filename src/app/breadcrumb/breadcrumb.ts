import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class BreadcrumbComponent {
  @Input() category: string | null = null;

  get displayCategory(): string {
    return this.category ? this.category : 'Samba';
  }
}
