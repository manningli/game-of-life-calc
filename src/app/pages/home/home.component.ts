import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  playerCountChanged(count: number) {
    this.playerCount = count;
    sessionStorage.setItem('playerCount', `${count}`);
  }

  startClicked() {
    var currentPlayer: Player = {
      number: 1,
    };
    sessionStorage.setItem('currentPlayer', JSON.stringify(currentPlayer));
    this.router.navigate(['calculator']);
  }
}
