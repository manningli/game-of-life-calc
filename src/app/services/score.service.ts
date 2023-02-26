import { Injectable, isDevMode } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  playerCount = 0;
  players: Player[] = [];
  currentPlayerIndex = 0;

  constructor() {}

  setPlayerCount(newCount: number = 0): void {
    this.playerCount = newCount;

    this.players = new Array<Player>();
    for (let index = 0; index < newCount; index++) {
      this.createPlayer();
      console.log('create ' + index);
    }
    console.log('players');

    console.log(this.players);
  }

  getPlayer(playerIndex: number): Player {
    if (this.players.length === 0) {
      let newPlayer: Player = {
        playerName: '',
        cashSum: 0,
        tileSum: 0,
        loanSum: 0,
        housingSum: 0,
      };
      return newPlayer;
    }

    return this.players[playerIndex];
  }

  private createPlayer() {
    let newPlayer: Player = {
      playerName: '',
      cashSum: 0,
      tileSum: 0,
      loanSum: 0,
      housingSum: 0,
    };

    this.players.push(newPlayer);
  }
}
