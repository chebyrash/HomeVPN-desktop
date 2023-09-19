import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpChannelService } from "../services/http-channel.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly httpChannelService: HttpChannelService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return of(this.authService.isAuthenticated).pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          const { token } = this.authService.authProvider!;
          return this.httpChannelService.init(token);
        }

        return this.router.navigate(["/login"]);
      })
    );
  }
}
