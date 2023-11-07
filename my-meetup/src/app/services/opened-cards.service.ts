import { Injectable } from '@angular/core';
import { IMeetup } from '../entities/meetup';

@Injectable({
  providedIn: 'root',
})
export class OpenedCardsService {
  public cards: number[] = [];
  constructor() {
    const opened = localStorage
      .getItem('opened_cards')
      ?.split(' ')
      .map((el) => +el);

    if (opened) {
      this.cards = opened;
    } else {
      localStorage.setItem('onened_cards', this.cards.join(' '));
    }
  }

  public initOpenedCards(): void {
    localStorage.setItem('opened_cards', this.cards.join(' '));
  }

  public addOpenedCard(meetup: IMeetup): void {
    this.cards.push(meetup.id);
    this.initOpenedCards();
  }

  public deleteOpenedCard(meetup: IMeetup): void {
    this.cards.splice(this.cards.indexOf(meetup.id), 1);
    this.initOpenedCards();
  }

  public getOpenedCard() {
    return localStorage
      .getItem('opened_cards')
      ?.split(' ')
      .map((el) => +el);
  }
}
