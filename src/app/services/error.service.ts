import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    constructor(private readonly router: Router) {}

    public handleError(error: Error): void {
        const { code, originalError, scope } = JSON.parse(error.message.split('Error: ')[1]);

        if (!code || code < 0) {
            console.log(originalError, code, scope);
        }

        if (code && code > 0) {
            this.router.navigate(['/critical', { 
                code,
                originalError,
                scope
            }]);
        }
    }
}