import { Consumable } from "../interfaces/consumable.interface";
import { Country } from "../interfaces/country.interface";
import { CurrentConnection } from "../interfaces/current-connection.interface";
import { CurrentPlan } from "../interfaces/current-plan.interface";
import { Plan } from "../interfaces/plan.interface";
import { PaidPlan } from "../interfaces/subscription.interface";
import { Nullable } from "../utils/nullable.type";

export type MainResponse = {
  user_id: string;
  origin: {
    ip: string;
    country: string;
  };
  balance: number;
  countries: Array<Country>;
  plans: Array<Plan>;
  subscriptions: Array<PaidPlan>;
  consumables: Array<Consumable>;
  current_plan: Nullable<CurrentPlan>;
  current_connection: Nullable<CurrentConnection>;
  referral: {
    code: string;
    link: string;
    delta: number;
    referred: number;
    show_referral_prompt: boolean;
  };
  ads: {
    vendor: string;
    ios: string;
    android: string;
    ios_yandex: string;
    android_yandex: string;
  };
  captcha: {
    hcaptcha: string;
  };
  contact: {
    email: string;
    telegram: string;
  };
};
