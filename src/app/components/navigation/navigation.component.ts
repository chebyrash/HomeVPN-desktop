import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
    constructor(private readonly router: Router) {}

    public navigateTo(path: string): void {
        this.router.navigate([`/${path}`]);
    }

    public isActive(path: string): boolean {
        return this.router.url.includes(path);
    }
}
