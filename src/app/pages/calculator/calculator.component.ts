import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  constructor(private router: Router) {
    if (!sessionStorage.getItem('currentPlayer')) {
      this.router.navigateByUrl('');
    }
  }
}
