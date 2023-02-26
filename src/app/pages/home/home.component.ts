import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerCount = 0;

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    // this.playerNameFormGroup = this.formBuilder.group({
    //   playerCountCtrl: ['', Validators.required]
    // })
    // this.playerNameFormGroup.addControl('playerCountCtrl')
  }

  playerCountUpdated(selectionChange: MatSelectChange) {
    // sessionStorage.clear();
    // console.log('player count update: ' + selectionChange.value);

    // sessionStorage.setItem('playerCount', selectionChange.value);
    // sessionStorage.setItem('currentPlayer', '1');
    this.scoreService.setPlayerCount(selectionChange.value);
  }
}
