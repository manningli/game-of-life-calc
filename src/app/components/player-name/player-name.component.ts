import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss'],
})
export class PlayerNameComponent implements OnInit {
  currentPlayer = 0;
  playerName = '';

  @Output() nextClicked = new EventEmitter();

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
  }

  nextBtnClicked() {
    sessionStorage.setItem(`player${this.currentPlayer}Name`, this.playerName);
    this.nextClicked.emit();
  }
}
