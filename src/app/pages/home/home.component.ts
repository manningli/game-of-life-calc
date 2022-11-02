import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerCount = 0;

  constructor() {}

  ngOnInit(): void {}

  playerCountUpdated(selectionChange: MatSelectChange) {
    sessionStorage.clear();
    console.log('player count update: ' + selectionChange.value);

    sessionStorage.setItem('playerCount', selectionChange.value);
    sessionStorage.setItem('currentPlayer', '1');
  }
}
