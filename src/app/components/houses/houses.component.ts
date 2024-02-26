import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { House } from 'src/app/shared/interfaces/house';
import { Player } from 'src/app/shared/interfaces/player';
import { SelectOption } from 'src/app/shared/interfaces/select-option';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  currentPlayer: Player;
  form: FormGroup;
  houseCountSelection = new FormControl<SelectOption | null>({
    value: null,
    disabled: false,
  });

  selectOptions: SelectOption[] = [
    { value: '1', viewValue: '1 house' },
    { value: '2', viewValue: '2 houses' },
    { value: '3', viewValue: '3 houses' },
    { value: '4', viewValue: '4 houses' },
  ];

  @Output() backClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.currentPlayer = JSON.parse(
      sessionStorage.getItem('currentPlayer') ?? '{}'
    );

    this.form = this.fb.group({
      houses: this.fb.array<
        FormGroup<{ houseValue: FormControl<number | null> }>
      >([]),
    });
  }

  ngOnInit(): void {
    // TODO: use this reducer to sum the value of houses to determine winner
    // this.playerSum =
    //   this.currentPlayer.houses?.reduce(
    //     (accumulator, house) => accumulator + (house.price ?? 0),
    //     0
    //   ) ?? 0;

    this.houseCountSelection.setValue(
      this.selectOptions.find(
        (o) => o.value === this.currentPlayer.houses?.length.toString()
      ) ?? null
    );

    this.currentPlayer.houses?.forEach((house) => {
      this.addExistingHouse(house);
    });
  }

  get houseControls(): FormArray<
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

    this.houseControls.push(houseForm);
  }

  private addExistingHouse(house: House) {
    const houseForm = this.fb.group({
      houseValue: new FormControl<number | null>(
        { value: house.price ?? null, disabled: false },
        { validators: [Validators.required, Validators.min(1)] }
      ),
    });

    this.houseControls.push(houseForm);
  }

  houseCountChanged(newCount: number) {
    this.houseControls.controls = [];
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
    this.currentPlayer.houses = [];
    for (let i = 0; i < this.houseControls.controls.length; i++) {
      const house: House = {
        number: i,
        price: this.houseControls.controls[i].value.houseValue ?? 0,
      };

      this.currentPlayer.houses.push(house);
    }

    sessionStorage.setItem('currentPlayer', JSON.stringify(this.currentPlayer));
  }

  shouldEnableNextBtn() {
    return this.houseControls.length > 0 && this.form.valid;
  }
}
