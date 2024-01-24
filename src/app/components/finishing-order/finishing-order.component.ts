import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces/select-option';

@Component({
  selector: 'app-finishing-order',
  templateUrl: './finishing-order.component.html',
  styleUrls: ['./finishing-order.component.scss'],
})
export class FinishingOrderComponent implements OnInit {
  selectedRetirementOrders: string[] = [];
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

  ngOnInit(): void {
    this.selectedRetirementOrders = this.getSelectedRetirementOrders();

    const currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    const existingSum = sessionStorage.getItem(
      `player${currentPlayer}RetirementOrder`
    );

    this.selectedOrder.setValue(
      this.selectOptions.find((o) => o.value === existingSum) ?? null
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
    const currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    sessionStorage.setItem(
      `player${currentPlayer}RetirementOrder`,
      this.selectedOrder.value?.value ?? ''
    );
  }

  // private getRetirementBonus(): string {
  //   // switch (this.form.controls['selectedOrder'].value?.toString()) {
  //   switch (this.selectedOrder.value?.value) {
  //     case '1':
  //       return '400000';
  //     case '2':
  //       return '300000';
  //     case '3':
  //       return '200000';
  //     case '4':
  //       return '100000';
  //     default:
  //       return '0';
  //   }
  // }

  shouldEnableNext() {
    return this.selectedOrder.valid;
  }

  private getSelectedRetirementOrders(): string[] {
    var selectedOrders: string[] = [];

    for (let i = 1; i <= 4; i++) {
      selectedOrders.push(
        sessionStorage.getItem(`player${i}RetirementOrder`) ?? ''
      );
    }

    return selectedOrders;
  }
}
