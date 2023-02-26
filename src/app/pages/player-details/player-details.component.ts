import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  currentPlayer: Player;
  playerIndex: number;

  playerNameFormGroup: FormGroup = this.formBuilder.group({
    playerName: new FormControl('', Validators.required),
  });

  cashSumFormGroup: FormGroup = this.formBuilder.group({});

  constructor(
    private activedRoute: ActivatedRoute,
    private scoreService: ScoreService,
    private formBuilder: FormBuilder
  ) {
    this.playerIndex = +(
      this.activedRoute.snapshot.paramMap.get('player-index') ?? 0
    );
    this.scoreService.currentPlayerIndex = this.playerIndex - 1;
    console.log(this.playerIndex - 1);

    this.currentPlayer = this.scoreService.getPlayer(this.playerIndex - 1);
    // this.currentPlayer.playerName = 'test';
  }

  ngOnInit(): void {
    console.log('init');
    this.currentPlayer.playerName = 'test';
    this.currentPlayer.cashSum = 99;
    console.log(this.currentPlayer);
    console.log(this.scoreService.players);
  }

  logTest() {
    console.log(this.currentPlayer);
  }
}
