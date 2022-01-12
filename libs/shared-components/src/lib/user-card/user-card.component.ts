import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'clean-architecture-monorepo-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() userId?: string;
}
