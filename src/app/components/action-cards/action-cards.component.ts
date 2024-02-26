import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-action-cards',
  templateUrl: './action-cards.component.html',
  styleUrls: ['./action-cards.component.scss'],
})
export class ActionCardsComponent implements OnInit {
  currentPlayer: Player;
  actionCardsCount = new FormControl<number | null>(
    { value: null, disabled: false },
    { validators: [Validators.required, Validators.min(0)] }
  );

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );
  }

  ngOnInit(): void {
    this.actionCardsCount.setValue(this.currentPlayer.actionCardsCount ?? 0);
  }

  nextBtnClicked() {
    this.setActionCardsCount();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setActionCardsCount();
    this.backClicked.emit();
  }

  setActionCardsCount() {
    this.currentPlayer.actionCardsCount = this.actionCardsCount.value ?? 0;
    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }
}
