import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-cards',
  templateUrl: './action-cards.component.html',
  styleUrls: ['./action-cards.component.scss'],
})
export class ActionCardsComponent implements OnInit {
  currentPlayer = 0;
  actionCardsCount = new FormControl<number | null>(
    { value: null, disabled: false },
    { validators: [Validators.required] }
  );

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
  }

  nextBtnClicked() {
    this.setActionCardsCount();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setActionCardsCount();
    this.backClicked.emit();
  }

  shouldEnableNextBtn() {
    return this.actionCardsCount.value && this.actionCardsCount.value > 0;
  }

  setActionCardsCount() {
    var count = this.actionCardsCount.value
      ? this.actionCardsCount.value.toString()
      : '';

    sessionStorage.setItem(`player${this.currentPlayer}ActionCardCount`, count);
  }
}
