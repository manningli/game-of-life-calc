import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  playerCountChanged(count: number) {
    this.playerCount = count;
    sessionStorage.setItem('playerCount', `${count}`);
  }

  startClicked() {
    sessionStorage.setItem('currentPlayer', '1');
    this.router.navigate(['calculator']);
  }
}
