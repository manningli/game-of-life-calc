import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FinishingOrderComponent } from './components/finishing-order/finishing-order.component';
import { HousesComponent } from './components/houses/houses.component';
import { MatInputModule } from '@angular/material/input';
import { PlayerNameComponent } from './components/player-name/player-name.component';
import { ActionCardsComponent } from './components/action-cards/action-cards.component';
import { PetsComponent } from './components/pets/pets.component';
import { BabiesComponent } from './components/babies/babies.component';
import { LoansComponent } from './components/loans/loans.component';
import { CashComponent } from './components/cash/cash.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalculatorComponent,
    FinishingOrderComponent,
    HousesComponent,
    PlayerNameComponent,
    ActionCardsComponent,
    PetsComponent,
    BabiesComponent,
    LoansComponent,
    CashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
