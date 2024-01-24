import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectOption } from 'src/app/shared/interfaces/select-option';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  currentPlayer = 0;
  playerSum = 0;
  houseCount = 0;
  form: FormGroup;
  houseCountSelection = new FormControl<SelectOption | null>({
    value: null,
    disabled: false,
  });

  selectOptions: SelectOption[] = [
    { value: '1', viewValue: '1 house' },
    { value: '2', viewValue: '2 house' },
    { value: '3', viewValue: '3 house' },
    { value: '4', viewValue: '4 house' },
  ];

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      houses: this.fb.array<
        FormGroup<{ houseValue: FormControl<number | null> }>
      >([]),
    });
  }

  ngOnInit(): void {
    this.currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    this.houseCount = Number(
      sessionStorage.getItem(`player${this.currentPlayer}HouseCount`)
    );
    this.playerSum = Number(
      sessionStorage.getItem(`player${this.currentPlayer}Sum`)
    );

    this.houseCountChanged(this.houseCount);
    this.houseCountSelection.setValue(
      this.selectOptions.find((o) => o.value === this.houseCount.toString()) ??
        null
    );
  }

  get houses(): FormArray<
    FormGroup<{
      houseValue: FormControl<number | null>;
    }>
  > {
    return this.form.controls['houses'] as FormArray;
  }

  private addHouse() {
    const houseForm = this.fb.group({
      houseValue: new FormControl<number | null>(
        { value: null, disabled: false },
        { validators: [Validators.required, Validators.min(1)] }
      ),
    });

    this.houses.push(houseForm);
  }

  houseCountChanged(newCount: number) {
    this.houseCount = newCount;
    this.houses.controls = [];
    for (let index = 0; index < newCount; index++) {
      this.addHouse();
    }
  }

  nextBtnClicked() {
    this.setHousesValue();
    this.nextClicked.emit();
  }

  backBtnClicked() {
    this.setHousesValue();
    this.backClicked.emit();
  }

  private setHousesValue() {
    var houseValuesSum = 0;
    this.houses.controls.forEach((house) => {
      houseValuesSum += house.value.houseValue ?? 0;
    });

    const currentPlayer = Number(sessionStorage.getItem('currentPlayer'));
    sessionStorage.setItem(
      `player${currentPlayer}HouseCount`,
      this.houseCount.toString()
    );
    sessionStorage.setItem(
      `player${currentPlayer}HouseSum`,
      houseValuesSum.toString()
    );
  }

  shouldEnableNextBtn() {
    return this.houseCount > 0 && this.form.valid;
  }
}
