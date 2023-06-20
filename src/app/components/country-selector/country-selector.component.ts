import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/interfaces/country.interface';
import { DialogRef } from 'src/app/modules/dialog';
import { AppQuery } from 'src/app/state/app.query';
import { AppService } from 'src/app/state/app.service';

@Component({
  standalone: true,
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CountrySelectorComponent implements OnInit {
  public readonly countries$ = this.appQuery.countries$;

  constructor(
    private readonly appQuery: AppQuery,
    private readonly appService: AppService,
    private readonly dialogRef: DialogRef
  ) {}

  public ngOnInit(): void {
    this.appService.loadMain().subscribe();
  }

  public selectCountry(country: Country): void {
    this.appService.setCountry(country);
    this.dialogRef.close(country);
  }
}
