import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})

export class BreadcrumbComponent implements OnInit {

  @Input() category: string | null = null;
  @Input() product: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // ✅ Auto-read category from URL if not passed
    if (!this.category) {
      this.route.paramMap.subscribe(params => {
        const cat = params.get('category');
        if (cat) {
          this.category = cat;
        }
      });
    }
  }

  get displayCategory(): string {
    return this.category ?? '';
  }

  get hasProduct(): boolean {
    return !!this.product;
  }

}



// export class BreadcrumbComponent {

//   @Input() category: string | null = null;
//   @Input() product: string | null = null;

//     get displayCategory(): string {
//     return this.category ?? 'Samba';  // fallback Samba
//   }

//   get hasProduct(): boolean {
//     return !!this.product;
//   }
// }
