import { Component } from '@angular/core';
import { Card } from './card/card.component';

@Component({
  selector: 'admin-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  adminCard : Card[] = [
    {
      title: 'Earnings',
      description: '$40,000',
      color: 'success',
    },
    {
      title: 'Earnings',
      description: '$40,000',
      color: 'primary',
    },
    {
      title: 'Earnings',
      description: '$40,000',
      color: 'danger',
    },
  ];
}