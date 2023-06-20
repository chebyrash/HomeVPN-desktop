import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VersionComponent {
  public readonly appVersion = localStorage.getItem('appVersion') || '1.0';
}
