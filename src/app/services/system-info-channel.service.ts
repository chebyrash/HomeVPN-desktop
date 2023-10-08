import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemInfo } from '../models/interfaces/system-info.interface';

@Injectable({
    providedIn: 'root'
})
export class SystemInfoChannelService {
    getSystemInfo(): Observable<SystemInfo> {
        return window.electron.invoke$<SystemInfo>('system-info', { action: 'get-system-info'});
    }

    getAppVersion(): Observable<string> {
        return window.electron.invoke$<string>('system-info', { action: 'get-bin-version' });
    }

    getFreePort(): Observable<number> {
        return window.electron.invoke$<number>('system-info', { action: 'get-free-port'});
    }

    getWinAppDir(): Observable<string> {
        return window.electron.invoke$<string>('system-info', { action: 'get-win-app-dir'});
    }

    async overrideUserAgent(): Promise<any> {
        return window.electron.invoke('system-info', { action: 'override-user-agent' });
    }

}