import { House } from './house';

export interface Player {
  number: number;
  name?: string;
  retirementOrder?: string;
  houses?: House[];
  actionCardsCount?: number;
}
