import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  playerCount = 0;
  currentPlayer = 0;
  currentPlayerName = '';

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.playerCount = Number(sessionStorage.getItem('playerCount'));
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
  }

  updatePlayerName() {
    this.currentPlayerName = this.nameInput.nativeElement.value;
    console.log(
      `Player ${this.currentPlayer} name updated: ${this.currentPlayerName}`
    );

    sessionStorage.setItem(
      'playerName' + this.currentPlayer,
      this.currentPlayerName
    );

    this.router.navigate(['money']);
  }
}
