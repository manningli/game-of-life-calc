import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  currentPlayer: Player;

  @Output() backClicked = new EventEmitter();

  constructor(private router: Router) {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );
  }

  getRetirementVerbiage(): string {
    switch (this.currentPlayer.retirementOrder) {
      case '1':
        return '1st';
      case '2':
        return '2nd';
      case '3':
        return '3rd';
      default:
        return this.currentPlayer.retirementOrder + 'th';
    }
  }

  getRetirementBonusAmt(): number {
    switch (this.currentPlayer.retirementOrder) {
      case '1':
        return 400_000;
      case '2':
        return 300_000;
      case '3':
        return 200_000;
      case '4':
        return 100_000;
      default:
        return 0;
    }
  }

  getHouseValueSum(): number {
    var sum = 0;
    this.currentPlayer.houses?.forEach((house) => {
      sum += house.price ?? 0;
    });
    return sum;
  }

  getNetWorth(): number {
    return (
      this.getRetirementBonusAmt() +
      this.getHouseValueSum() +
      (this.currentPlayer.actionCardsCount ?? 0) * 100000 +
      (this.currentPlayer.petsCount ?? 0) * 100000 +
      (this.currentPlayer.babiesCount ?? 0) * 50000 +
      (this.currentPlayer.loansCount ?? 0) * -60000 +
      (this.currentPlayer.cashSum ?? 0)
    );
  }

  nextBtnClicked() {
    this.currentPlayer.netWorth = this.getNetWorth();
    sessionStorage.setItem(
      `player${this.currentPlayer.number}`,
      JSON.stringify(this.currentPlayer)
    );

    const playerCount = +(sessionStorage.getItem('playerCount') ?? 2);

    if (this.currentPlayer.number < playerCount) {
      var newPlayer: Player = {
        number: this.currentPlayer.number + 1,
      };
      sessionStorage.setItem('currentPlayer', JSON.stringify(newPlayer));
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['calculator']));
    } else {
      this.router.navigate(['results']);
    }
  }

  backBtnClicked() {
    this.backClicked.emit();
  }
}
