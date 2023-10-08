import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, catchError, map, of, switchMap, throwError } from 'rxjs';

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
            switchMap((response) => {
                const parsedRes = JSON.parse(response);
                if (parsedRes?.error) {
                    return throwError(() => new Error(parsedRes?.error));
                }
                return of(parsedRes);
            })
        );
    }

    post<R>(url: string, data: any): Observable<R> {
        return window.electron.invoke$('http', {
            action: 'http-request',
            payload: { url, body: data, method: 'POST' }
        }).pipe(
            switchMap((response) => {
                const parsedRes = JSON.parse(response);
                if (parsedRes?.error) {
                    return throwError(() => new Error(parsedRes?.error))
                }
                return of(parsedRes);
            })
        )
    }
}