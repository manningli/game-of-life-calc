import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss'],
})
export class PlayerNameComponent implements OnInit {
  currentPlayer = 0;
  playerName = new FormControl();

  @Output() nextClicked = new EventEmitter();

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));

    var existingName = sessionStorage.getItem(
      `player${this.currentPlayer}Name`
    );
    this.playerName.setValue(existingName);
  }

  nextBtnClicked() {
    sessionStorage.setItem(
      `player${this.currentPlayer}Name`,
      this.playerName.value
    );
    this.nextClicked.emit();
  }

  shouldEnableNext() {
    return this.playerName.value && this.playerName.value.length > 0;
  }
}
