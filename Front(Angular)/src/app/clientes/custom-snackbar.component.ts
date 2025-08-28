import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="custom-snackbar">
      <mat-icon class="snackbar-icon">check_circle</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [`
    .custom-snackbar {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 600;
      font-size: 16px;
    }
    .snackbar-icon {
      margin-right: 10px;
      font-size: 20px;
    }
  `]
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
