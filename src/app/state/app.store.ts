import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { APP_INITIAL_STATE, AppState } from './app.state';

@StoreConfig({ name: 'app_store' })
@Injectable({ providedIn: 'root' })
export class AppStore extends Store<AppState> {
    constructor() {
        super(APP_INITIAL_STATE)
    }
}