import { Injectable } from '@angular/core';
import { PlatformService } from './platform-service';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WindowsPlatformService extends PlatformService {
    override connect(country: string): Observable<unknown> {
        throw new Error('Method not implemented.');
    }
    constructor() {
        super();
    }
    generateRawWgConfig(): string {
        throw new Error('Method not implemented.');
    }
    writeConfigToFilesystem(rawConfig: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    wgUp(): void {
        throw new Error('Method not implemented.');
    }
    wgDown(): void {
        throw new Error('Method not implemented.');
    }
    
}