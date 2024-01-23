import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-finishing-order',
  templateUrl: './finishing-order.component.html',
  styleUrls: ['./finishing-order.component.scss'],
})
export class FinishingOrderComponent implements OnInit {
  selectedRetirementOrders: number[] = [];
  selectedOrder: number | undefined;

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  ngOnInit(): void {
    this.selectedRetirementOrders =
      sessionStorage
        .getItem('selectedRetirementOrders')
        ?.split(',')
        .map(Number) ?? [];

    const currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    const existingSum = sessionStorage.getItem(
      `player${currentPlayer}RetirementOrder`
    );
    this.selectedOrder = existingSum ? +existingSum : undefined;
  }

  retirementOrderChanged(order: number) {
    this.selectedOrder = order;
    this.selectedRetirementOrders.push(order);
  }

  nextBtnClicked() {
    this.setRetirementOrderAndBonus();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setRetirementOrderAndBonus();
    this.backClicked.emit();
  }

  private setRetirementOrderAndBonus() {
    sessionStorage.setItem(
      'selectedRetirementOrders',
      this.selectedRetirementOrders.join(',')
    );

    const currentPlayer = Number(sessionStorage.getItem('currentPlayer'));

    // sessionStorage.setItem(
    //   `player${currentPlayer}Sum`,
    //   this.getRetirementBonus()
    // );

    sessionStorage.setItem(
      `player${currentPlayer}RetirementOrder`,
      this.selectedOrder?.toString() ?? ''
    );
  }

  private getRetirementBonus(): string {
    switch (this.selectedOrder?.toString()) {
      case '1':
        return '400000';
      case '2':
        return '300000';
      case '3':
        return '200000';
      case '4':
        return '100000';
      default:
        return '0';
    }
  }

  shouldEnableNext() {
    return this.selectedOrder;
  }
}
