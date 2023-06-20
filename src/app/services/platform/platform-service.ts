import { ConnectResponse } from "src/app/models/interfaces/connect-response.interface";
import { SystemInfo } from "src/app/models/interfaces/system-info.interface";
import { ApiService } from "../api.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export abstract class PlatformService {
    public readonly apiService: ApiService;
    
    constructor() {
        this.apiService = inject(ApiService);
    }
    
    public readonly bridge = window.electron;

    abstract connect(country: string): Observable<unknown>;

    abstract generateRawWgConfig(config: ConnectResponse, privateKey: string): string;

    abstract writeConfigToFilesystem(rawConfig: string): Promise<boolean>;

    abstract wgUp(): void;

    abstract wgDown(): void;

    async executeCommand(command: string, sudo: boolean = false) {
        return await window.electron.invoke(
            'shell', 
            { 
                action: 'execute_command', 
                payload: {command, sudo}
            }
        );
    }
}