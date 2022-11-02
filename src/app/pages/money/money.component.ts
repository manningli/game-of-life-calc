import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent implements OnInit {
  currentPlayer = 0;
  playerName: any;

  constructor() {}

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    this.playerName = sessionStorage.getItem(
      `playerName ${this.currentPlayer}`
    );
  }
}
