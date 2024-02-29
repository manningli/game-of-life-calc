import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
})
export class LoansComponent {
  currentPlayer: Player;
  loansCount = new FormControl<number | null>(
    { value: null, disabled: false },
    { validators: [Validators.required, Validators.min(0)] }
  );

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );

    this.loansCount.setValue(this.currentPlayer.loansCount ?? null);
  }

  nextBtnClicked() {
    this.setLoansCount();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setLoansCount();
    this.backClicked.emit();
  }

  setLoansCount() {
    this.currentPlayer.loansCount = this.loansCount.value ?? 0;
    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }

  shouldEnableNextBtn() {
    return this.loansCount.value || this.loansCount.value === 0;
  }
}
