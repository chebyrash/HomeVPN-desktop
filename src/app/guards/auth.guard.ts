import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { SystemInfo } from '../models/interfaces/system-info.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly apiService: ApiService,
    ) {}

    canActivate(
        _route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['login']);
            return false;
        }
        const systemInfo = window.systemInfo();
        if (systemInfo && systemInfo?.user?.uid && systemInfo?.user?.gid) {
            return from(this.apiService.init(window.systemInfo())).pipe(
                map(() => true)
            );
        }

        return from(window.electron.invoke('shell', { action: 'get_system_info' })).pipe(
            switchMap((systemInfo) => {
                console.log(systemInfo);
                window.localStorage.setItem('systemInfo', JSON.stringify(systemInfo));
                return from(this.apiService.init(systemInfo as SystemInfo));
            }),
            map(() => true)
        )
    }
}
