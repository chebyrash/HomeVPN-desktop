import { Injectable } from '@angular/core';
import { AppStore } from './app.store';
import { ApiService } from '../services/api.service';
import {
  EMPTY,
  Observable,
  combineLatest,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MainResponse } from '../models/interfaces/main-response.interface';
import { Country } from '../models/interfaces/country.interface';
import { MacosPlatformService } from '../services/platform/macos-platform.service';
import { Router } from '@angular/router';
import { CountrySelectorComponent } from '../components/country-selector/country-selector.component';
import { DialogRef, DialogService } from '../modules/dialog';
import { DarwinService } from '../services/platform/darwin-platform.service';
import { AppQuery } from './app.query';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private readonly store: AppStore,
    private readonly apiService: ApiService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly darwinService: DarwinService,
    private readonly appQuery: AppQuery
  ) {}

  public purchasePlan(planId: string): Observable<unknown> {
    return this.apiService.purchasePlan(planId).pipe(
      switchMap(() => this.loadMain())
    );
  }

  public wgUp() {
    return from(this.darwinService.wgUp());
  }

  public wgDown() {
    return from(this.darwinService.wgDown());
  }

  public connectionInit(country?: string) {
    const { privateKey, publicKey } = window.wireguard.generateKeypair();
    return this.apiService.connect({ 
      country: country || this.appQuery.country?.id!, 
      public_key: publicKey
    }).pipe(
      switchMap(response => {
        return this.darwinService.updateWgConfig(response, privateKey);
      }),
      switchMap(() => this.loadMain())
    )
  }

  public loadMain(): Observable<MainResponse> {
    return this.apiService.getMain().pipe(
      tap((MAIN) => {
        console.log({ MAIN });
      }),
      tap((main) => {
        this.store.update({ main });
      })
    );
  }

  public setConnection(state: 'on' | 'off'): void {
    localStorage.setItem('lastWgState', state);
    this.store.update({ connection: state });
  }

  public setCountry(country: Country): void {
    localStorage.setItem('country', JSON.stringify(country));
    this.store.update({ country });
  }

  public applyLink(link: string): Observable<unknown> {
    const code = link.split('/').pop() as string;
    return this.apiService
      .applyCode(code)
      .pipe(switchMap(() => this.loadMain()));
  }

  public openCountrySelector(): DialogRef<Country> {
    return this.dialogService.openFullscreen<
      CountrySelectorComponent,
      Country,
      unknown
    >(CountrySelectorComponent, {
      closable: true,
      title: 'Select country',
    });
  }

  public setRestored(restored: boolean): void {
    this.store.update({ restored });
  }
}
