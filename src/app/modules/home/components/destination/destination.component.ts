import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogService } from "src/app/modules/dialog";
import { CountrySelectorComponent } from "../../../../components/country-selector/country-selector.component";
import { AppQuery } from "src/app/state/app.query";
import { AppService } from "src/app/state/app.service";

@Component({
  selector: "app-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationComponent {
  readonly country$ = this.appQuery.country$;

  constructor(
    private readonly appService: AppService,
    private readonly appQuery: AppQuery
  ) {}

  openCountrySelector(): void {
    this.appService.openCountrySelector().afterClosed.subscribe(country => {
      if (country) {
        this.appService.setCountry(country);
      }
    })
  }
}
