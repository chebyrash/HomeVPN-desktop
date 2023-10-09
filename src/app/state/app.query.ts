import { Injectable } from "@angular/core";
import { Query, Store } from "@datorama/akita";
import { AppState } from "./app.state";
import { AppStore } from "./app.store";
import { combineLatest, filter, map } from "rxjs";
import { Country } from "../models/interfaces/country.interface";
import { Plan } from "../models/interfaces/plan.interface";
import { CurrentConnection } from "../models/interfaces/current-connection.interface";
import { SystemInfo } from "../models/interfaces/system-info.interface";
import { CurrentPlan } from "../models/interfaces/current-plan.interface";
import { Nullable } from "../models/utils/nullable.type";

@Injectable({
  providedIn: "root",
})
export class AppQuery extends Query<AppState> {
  readonly country$ = this.select("country");

  readonly plans$ = this.select((state) => state.main?.plans);

  readonly countries$ = this.select((state) => state.main?.countries);

  readonly connection$ = this.select("processPid").pipe(
    map((processPid) => processPid !== null)
  );

  readonly currentPlan$ = this.select((state) => state.main?.current_plan);

  readonly ipInfo$ = combineLatest([
    this.connection$,
    this.select("main"),
  ]).pipe(
    map(([connection, main]) => {
      const hasConnection = connection && main?.current_connection?.ip;
      return hasConnection
        ? {
            ip: main?.current_connection?.ip,
            country: main?.current_connection?.country,
          }
        : {
            ip: main?.origin.ip,
            country: main?.origin.country,
          };
    })
  );

  readonly userId$ = this.select((state) => state.main?.user_id);

  readonly balance$ = this.select((state) => state.main?.balance);

  readonly telegram$ = this.select((state) => state.main?.contact.telegram);

  readonly referrals$ = this.select((state) => state.main?.referral).pipe(
    filter(Boolean)
  );

  readonly referralLink$ = this.referrals$.pipe(
    map((referrals) => referrals.link)
  );

  readonly referralStats$ = this.referrals$.pipe(
    map((referrals) => ({
      invited: referrals.referred,
      earned: referrals.referred * referrals.delta,
    }))
  );

  readonly showReferralPrompt$ = this.referrals$.pipe(
    map((referrals) => referrals.show_referral_prompt)
  );

  readonly delta$ = this.referrals$.pipe(map((referrals) => referrals.delta));

  get activePlan() {
    return this.getValue().main?.current_plan;
  }

  get country(): Country | null {
    return this.getValue().country;
  }

  get currentConnection(): CurrentConnection | null | undefined {
    return this.getValue().main?.current_connection;
  }

  get balance(): number {
    return this.getValue().main?.balance!;
  }

  get connection(): boolean {
    return this.getValue().processPid !== null;
  }

  get plans(): Plan[] {
    return this.getValue().main?.plans!;
  }

  get freePort(): number {
    return this.getValue().freePort!;
  }

  get systemInfo(): SystemInfo {
    return this.getValue().systemInfo!;
  }

  get processPid(): number | null {
    return this.getValue().processPid;
  }

  get currentPlan(): Nullable<CurrentPlan> | undefined {
    return this.getValue().main?.current_plan;
  }

  get origin(): { country: string; ip: string } | undefined {
    return this.getValue().main?.origin;
  }

  get winAppDir(): string {
    return this.systemInfo.winAppDir;
  }

  get winCoreExePath(): string {
    return this.winAppDir + "\\core.exe";
  }

  get winCoreConfigPath(): string {
    return this.winAppDir + "\\config.json";
  }

  constructor(protected override store: AppStore) {
    super(store);
  }
}
