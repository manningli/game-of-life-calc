import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-babies',
  templateUrl: './babies.component.html',
  styleUrls: ['./babies.component.scss'],
})
export class BabiesComponent {
  currentPlayer: Player;
  babiesCount = new FormControl<number | null>(
    { value: null, disabled: false },
    { validators: [Validators.required, Validators.min(0)] }
  );

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );

    this.babiesCount.setValue(this.currentPlayer.babiesCount ?? null);
  }

  nextBtnClicked() {
    this.setBabiesCount();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setBabiesCount();
    this.backClicked.emit();
  }

  setBabiesCount() {
    this.currentPlayer.babiesCount = this.babiesCount.value ?? 0;
    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }
}
