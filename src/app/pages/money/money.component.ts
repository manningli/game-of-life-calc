import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent implements OnInit {
  currentPlayer = 0;
  playerName: any;
  countFiveThousands = 0;
  countTenThousands = 0;
  countTwentyThousands = 0;
  countFiftyThousands = 0;
  countHundredThousands = 0;

  sumFiveThousands = 0;
  sumTenThousands = 0;
  sumTwentyThousands = 0;
  sumFiftyThousands = 0;
  sumHundredThousands = 0;

  sumTotal =
    this.sumFiveThousands +
    this.sumTenThousands +
    this.sumTwentyThousands +
    this.sumFiftyThousands +
    this.sumHundredThousands;

  constructor() {}

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    this.playerName = sessionStorage.getItem(`playerName${this.currentPlayer}`);
  }

  updateFiveThousands() {
    this.sumFiveThousands = this.countFiveThousands * 5000;
  }

  updateTenThousands() {
    this.sumTenThousands = this.countTenThousands * 10000;
  }

  updateTwentyThousands() {
    this.sumTwentyThousands = this.countTwentyThousands * 20000;
  }

  updateFiftyThousands() {
    this.sumFiftyThousands = this.countFiftyThousands * 50000;
  }

  updateHundredThousands() {
    this.sumHundredThousands = this.countHundredThousands * 100000;
  }
}
