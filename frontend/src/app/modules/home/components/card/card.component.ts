import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import Card from '../../../../domains/tasks/model/Card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() data?: Card;
}
