import { Injectable } from '@angular/core';
import { Query, Store } from '@datorama/akita';
import { AppState } from './app.state';
import { AppStore } from './app.store';
import { combineLatest, filter, map } from 'rxjs';
import { Country } from '../models/interfaces/country.interface';
import { CurrentPlan } from '../models/interfaces/current-plan.interface';
import { Plan } from '../models/interfaces/plan.interface';
import { CurrentConnection } from '../models/interfaces/current-connection.interface';

@Injectable({
    providedIn: 'root'
})
export class AppQuery extends Query<AppState> {
    public readonly country$ = this.select('country');

    public readonly plans$ = this.select(state => state.main?.plans);

    get plans(): Plan[] {
        return this.getValue().main?.plans!;
    }

    public readonly countries$ = this.select((state) => state.main?.countries);

    public readonly state$ = this.select('connection');

    get state(): 'on' | 'off' {
        return this.getValue().connection;
    }

    public readonly currentPlan$ = this.select(state => state.main?.current_plan);

    get currentPlan(): CurrentPlan | null | undefined {
        return this.getValue().main?.current_plan;
    }

    public readonly ipInfo$ = combineLatest([this.state$, this.select('main')]).pipe(
        map(([connection, main]) => {
            if (connection === 'on' && main?.current_connection?.ip) {
                return { 
                    ip: main?.current_connection?.ip, 
                    country: main?.current_connection?.country 
                }
            }

            return { 
                ip: main?.origin.ip, 
                country: main?.origin.country 
            }
        })
    );

    public readonly userId$ = this.select(state => state.main?.user_id);

    public readonly balance$ = this.select((state) => state.main?.balance);

    get balance(): number {
        return this.getValue().main?.balance!;
    }

    public readonly telegram$ = this.select((state) => state.main?.contact.telegram);

    public readonly referrals$ = this.select((state) => state.main?.referral).pipe(filter(Boolean));

    public readonly referralLink$ = this.referrals$.pipe(
        map(referrals => referrals.link)
    );

    public readonly referralStats$ = this.referrals$.pipe(
        map((referrals) => ({
            invited: referrals.referred,
            earned: referrals.referred * referrals.delta
        }))
    );

    public showReferralPrompt$ = this.referrals$.pipe(
        map(referrals => referrals.show_referral_prompt)
    );

    public restored$ = this.select('restored');

    public delta$ = this.referrals$.pipe(map((referrals) => {
        return referrals.delta;
    }));

    get activePlan() {
        return this.getValue().main?.current_plan;
    }

    get country(): Country | null  {
        return this.getValue().country;
    }

    get currentConnection(): CurrentConnection | null | undefined {
        return this.getValue().main?.current_connection;
    }
    
    constructor(protected override store: AppStore) {
        super(store);
    }
}