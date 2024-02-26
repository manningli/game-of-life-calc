import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss'],
})
export class PlayerNameComponent {
  currentPlayer: Player;
  playerName = new FormControl();

  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem(`currentPlayer`) ?? '{}'
    );
    this.playerName.setValue(this.currentPlayer.name);
  }

  nextBtnClicked() {
    this.currentPlayer.name = this.playerName.value;
    sessionStorage.setItem(`currentPlayer`, JSON.stringify(this.currentPlayer));
    this.nextClicked.emit();
  }

  shouldEnableNext() {
    return this.playerName.value && this.playerName.value.length > 0;
  }
}
