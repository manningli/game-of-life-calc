import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent {
  currentPlayer: Player;
  petsCount = new FormControl<number | null>(
    { value: null, disabled: false },
    { validators: [Validators.required, Validators.min(0)] }
  );

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );

    this.petsCount.setValue(this.currentPlayer.petsCount ?? null);
  }

  nextBtnClicked() {
    this.setPetsCount();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setPetsCount();
    this.backClicked.emit();
  }

  setPetsCount() {
    this.currentPlayer.petsCount = this.petsCount.value ?? 0;
    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }
}
