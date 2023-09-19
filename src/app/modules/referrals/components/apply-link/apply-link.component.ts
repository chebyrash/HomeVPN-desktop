import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppService } from "src/app/state/app.service";
import { AppQuery } from "src/app/state/app.query";

@Component({
  selector: "app-apply-link",
  templateUrl: "./apply-link.component.html",
  styleUrls: ["./apply-link.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyLinkComponent {
  readonly showReferralPrompt$ = this.appQuery.showReferralPrompt$;

  link = null;

  constructor(
    private readonly appService: AppService,
    private readonly appQuery: AppQuery
  ) {}

  applyLink(): void {
    if (this.link) {
      this.appService.applyReferralLink(this.link).subscribe(() => {
        alert("Referral code applied!");
      });
    }
  }
}
