import { Nullable } from "../types/nullable.type";
import { CurrentPlan } from "./current-plan.interface";
import { Plan } from "./plan.interface";

export interface MainResponse {
    user_id: string;
    origin: {
        ip: string;
        country: string;
    };
    balance: number;
    countries: Array<{
        id: string;
        name: string;
        flag: string;
    }>;
    plans: Array<Plan>;
    subscriptions: Array<{
        id: string;
        name: string;
        popular: boolean;
    }>;
    consumables: Array<{
        id: string;
        name: string;
        popular: boolean;
    }>;
    current_plan: Nullable<CurrentPlan>;
    current_connection: Nullable<{
        country: string;
        ip: string;
        downloaded: number;
        uploaded: number;
    }>;
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
    },
    captcha: {
        hcaptcha: string;
    };
    contact: {
        email: string;
        telegram: string;
    };
}