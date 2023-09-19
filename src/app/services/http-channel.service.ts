import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpChannelService {
    async init(token: string): Promise<boolean> {
        return window.electron.invoke('http', {
            action: 'http-init',
            payload: {
                baseURL: environment.apiUrl,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        })
    }

    get<R>(url: string, params?: any): Observable<R> {
        return window.electron.invoke$('http', {
            action: 'http-request',
            payload: { url, params, method: 'GET' }
        }).pipe(
            map(response => {
                return JSON.parse(response);
            })
        );
    }

    post<R>(url: string, data: any): Observable<R> {
        return window.electron.invoke$('http', {
            action: 'http-request',
            payload: { url, body: data, method: 'POST' }
        }).pipe(
            map(response => {
                return JSON.parse(response);
            })
        )
    }
}