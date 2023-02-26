import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  @Output() sumTotal = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    this.playerName = sessionStorage.getItem(`playerName${this.currentPlayer}`);
  }

  updateFiveThousands() {
    this.sumFiveThousands = this.countFiveThousands * 5000;
    this.updateSumTotal();
  }

  updateTenThousands() {
    this.sumTenThousands = this.countTenThousands * 10000;
    this.updateSumTotal();
  }

  updateTwentyThousands() {
    this.sumTwentyThousands = this.countTwentyThousands * 20000;
    this.updateSumTotal();
  }

  updateFiftyThousands() {
    this.sumFiftyThousands = this.countFiftyThousands * 50000;
    this.updateSumTotal();
  }

  updateHundredThousands() {
    this.sumHundredThousands = this.countHundredThousands * 100000;
    this.updateSumTotal();
  }

  updateSumTotal() {
    this.sumTotal =
      this.sumFiveThousands +
      this.sumTenThousands +
      this.sumTwentyThousands +
      this.sumFiftyThousands +
      this.sumHundredThousands;
  }

  updateTotalAndProceedToLifeTiles() {
    sessionStorage.setItem(
      `player${this.currentPlayer}Money`,
      this.sumTotal.toString()
    );

    this.router.navigate(['life-tiles']);
  }
}
