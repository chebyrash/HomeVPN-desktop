export interface CurrentPlan {
    id: string;
    name: string;
    is_paid: boolean;
    start_date: string;
    start_date_unix: number;
    end_date: string;
    end_date_unix: number;
}