import { Injectable } from '@angular/core';
import { PlatformService } from './platform-service';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LinuxPlatformService extends PlatformService {
    override connect(country: string): Observable<unknown> {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super();
    }
    override generateRawWgConfig(): string {
        throw new Error('Method not implemented.');
    }
    override writeConfigToFilesystem(rawConfig: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    override wgUp(): void {
        throw new Error('Method not implemented.');
    }
    override wgDown(): void {
        throw new Error('Method not implemented.');
    }
}