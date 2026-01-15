import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="toast$ | async as msg">
      {{ msg }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #000;
      color: #fff;
      padding: 12px 20px;
      border-radius: 6px;
      font-weight: 500;
      z-index: 9999;
    }
  `]
})
export class ToastComponent {
  toast$: any;
  constructor(private toast: ToastService) {
    this.toast$ = this.toast.toast$;
  }
}
