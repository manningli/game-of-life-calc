import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';
import { SelectOption } from 'src/app/shared/interfaces/select-option';

@Component({
  selector: 'app-finishing-order',
  templateUrl: './finishing-order.component.html',
  styleUrls: ['./finishing-order.component.scss'],
})
export class FinishingOrderComponent implements OnInit {
  selectedRetirementOrders: string[] = [];
  currentPlayer: Player;
  selectedOrder = new FormControl<SelectOption | null>(
    { value: null, disabled: false },
    { validators: [Validators.required] }
  );
  selectOptions: SelectOption[] = [
    { value: '1', viewValue: '1st to retire: Collect 400k' },
    { value: '2', viewValue: '2nd to retire: Collect 300k' },
    { value: '3', viewValue: '3rd to retire: Collect 200k' },
    { value: '4', viewValue: '4th to retire: Collect 100k' },
  ];

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );
  }

  ngOnInit(): void {
    this.selectedRetirementOrders = this.getSelectedRetirementOrders();

    this.selectedOrder.setValue(
      this.selectOptions.find(
        (o) => o.value === this.currentPlayer.retirementOrder
      ) ?? null
    );
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
    this.currentPlayer.retirementOrder = this.selectedOrder.value?.value;
    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }

  shouldEnableNext() {
    return this.selectedOrder.valid;
  }

  getSelectedRetirementOrders(): string[] {
    var selectedOrders: string[] = [];

    for (let i = 1; i <= this.currentPlayer.number; i++) {
      var player: Player = JSON.parse(
        sessionStorage.getItem(`player${i}`) ?? '{}'
      );
      if (player.retirementOrder) {
        selectedOrders.push(player.retirementOrder);
      }
    }

    return selectedOrders;
  }
}
