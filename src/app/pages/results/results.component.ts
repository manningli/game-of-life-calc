import { Component } from '@angular/core';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  playerCount: number;
  players: Player[] = [];
  displayedColumns: string[] = ['position', 'name', 'netWorth'];

  constructor() {
    this.playerCount = +(sessionStorage.getItem('playerCount') ?? 0);

    for (let i = 1; i <= this.playerCount; i++) {
      const player = sessionStorage.getItem(`player${i}`) ?? '{}';
      this.players.push(JSON.parse(player));
    }

    this.players.sort((a, b) => (b.netWorth ?? 0) - (a.netWorth ?? 0));
  }
}
