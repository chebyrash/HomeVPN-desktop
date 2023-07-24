import { Country } from "../models/interfaces/country.interface";
import { MainResponse } from "../models/interfaces/main-response.interface";

const lastActiveCountry = localStorage.getItem('country');

export interface AppState {
    main: MainResponse | null;
    connection: 'on' | 'off',
    country: Country | null,
}

export const APP_INITIAL_STATE: AppState = {
    main: null,
    connection: 'off',
    country: lastActiveCountry ? JSON.parse(lastActiveCountry) as Country : null,
}