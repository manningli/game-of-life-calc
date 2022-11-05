import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LifeTilesComponent } from './pages/life-tiles/life-tiles.component';
import { MoneyComponent } from './pages/money/money.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PlayerComponent } from './pages/player/player.component';

const routes: Routes = [
  {
    path: '',
    title: 'Game of Life Calculator | Home',
    component: HomeComponent,
  },
  {
    path: 'player',
    title: 'Game of Life Calculator | Player Info',
    component: PlayerComponent,
  },
  {
    path: 'money',
    title: 'Game of Life Calculator | Money',
    component: MoneyComponent,
  },
  {
    path: 'life-tiles',
    title: 'Game of Life Calculator | Life Tiles',
    component: LifeTilesComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
