import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/interfaces/player';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
})
export class CashComponent {
  currentPlayer: Player;
  cashForm: FormGroup;

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor() {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );

    this.cashForm = new FormGroup({
      fiveThousands: new FormControl(
        {
          value: this.currentPlayer.cashCount?.fiveThousands ?? 0,
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.min(0)],
        }
      ),
      tenThousands: new FormControl(
        {
          value: this.currentPlayer.cashCount?.tenThousands ?? 0,
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.min(0)],
        }
      ),
      twentyThousands: new FormControl(
        {
          value: this.currentPlayer.cashCount?.twentyThousands ?? 0,
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.min(0)],
        }
      ),
      fiftyThousands: new FormControl(
        {
          value: this.currentPlayer.cashCount?.fiftyThousands ?? 0,
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.min(0)],
        }
      ),
      hundredThousands: new FormControl(
        {
          value: this.currentPlayer.cashCount?.hundredThousands ?? 0,
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.min(0)],
        }
      ),
    });
  }

  nextBtnClicked() {
    this.setCashValue();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setCashValue();
    this.backClicked.emit();
  }

  private setCashValue() {
    this.currentPlayer.cashCount = {
      fiveThousands: this.cashForm.controls.fiveThousands.value,
      tenThousands: this.cashForm.controls.tenThousands.value,
      twentyThousands: this.cashForm.controls.twentyThousands.value,
      fiftyThousands: this.cashForm.controls.fiftyThousands.value,
      hundredThousands: this.cashForm.controls.hundredThousands.value,
    };
    this.currentPlayer.cashSum = this.getSumTotal();

    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }

  getSumTotal(): number {
    return (
      this.cashForm.controls.fiveThousands.value * 5000 +
      this.cashForm.controls.tenThousands.value * 10000 +
      this.cashForm.controls.twentyThousands.value * 20000 +
      this.cashForm.controls.fiftyThousands.value * 50000 +
      this.cashForm.controls.hundredThousands.value * 100000
    );
  }

  shouldEnableNextBtn(): boolean {
    return this.cashForm.valid;
  }
}
