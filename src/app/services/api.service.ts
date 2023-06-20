import { Injectable } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { MainResponse } from 'src/app/models/interfaces/main-response.interface';
import { environment } from 'src/environment/environment';
import { ConnectResponse } from '../models/interfaces/connect-response.interface';
import { SystemInfo } from '../models/interfaces/system-info.interface';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly bridge = window.electron;

    constructor() {}

    public async init(systemInfo: SystemInfo): Promise<void> {
        try {
            await this.bridge.invoke('api', {
                action: 'init',
                payload: {
                    baseURL: environment.apiUrl,
                    timeout: 30000,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "User-Agent": "HomeVPN/desktop",
                        "HomeVPN-App-Version": environment.appVersion,
                        "HomeVPN-Device-ID": environment.deviceId,
                        "HomeVPN-Device-Model": systemInfo.model,
                        "HomeVPN-Device-OS": systemInfo.os,
                        "HomeVPN-Device-OS-Version": systemInfo.osVersion,
                    }
                }
            });
            await this.overrideUseragent();
        } catch(error: any) {
            console.error(error);
        }
    }

    public getMain(): Observable<MainResponse> {
        return from(
            this.bridge.invoke(
                'api', 
                { action: 'get', payload: { url: '/main' } }
            )
        ) as Observable<MainResponse>;
    }

    public purchasePlan(ID: string = '25093c7b-65b5-409f-a141-198210f0a6ba'): Observable<unknown> {
        return from(
            this.bridge.invoke(
                'api', 
                { action: 'post',  payload: { url: '/plan/purchase', data: { ID } }}
            )
        );
    }

    public connect(data: { country: string, public_key: string }): Observable<ConnectResponse> {
        return from(
            this.bridge.invoke(
                'api', 
                { action: 'post', payload: {url: '/connection/init', data}}
            )
        ) as Observable<ConnectResponse>;
    }

    public applyCode(code: string): Observable<{ delta: number}> {
        return from(
            this.bridge.invoke(
                'api',
                { action: 'post', payload: { url: '/promo/apply', data: { code } } }
            )
        ) as Observable<{ delta: number }>;
    }

    public async overrideUseragent(): Promise<unknown> {
        return this.bridge.invoke(
            'api', 
            { action: 'override_user_agent' }
        )
    }
}