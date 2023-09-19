import { Country } from "../models/interfaces/country.interface";
import { SystemInfo } from "../models/interfaces/system-info.interface";
import { MainResponse } from "../models/types/main-response.type";
import { Nullable } from "../models/utils/nullable.type";

export type AppState = {
  main: Nullable<MainResponse>;
  country: Nullable<Country>;
  freePort: Nullable<number>;
  systemInfo: Nullable<SystemInfo>;
  processPid: Nullable<number>;
};

const country = localStorage.getItem('country');
export const APP_INITIAL_STATE: AppState = {
  main: null,
  country: country ? JSON.parse(country) : null,
  systemInfo: null,
  freePort: null,
  processPid: null,
};
