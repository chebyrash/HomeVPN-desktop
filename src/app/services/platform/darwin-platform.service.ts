import { Injectable } from '@angular/core';
import { ConnectResponse } from 'src/app/models/interfaces/connect-response.interface';
import { getConfig } from 'src/app/utils/get-config';

@Injectable({
    providedIn: 'root'
})
export class DarwinService {
    constructor() {}

    public async wgUp(): Promise<unknown> {
        const user = window.systemInfo().username;
        return await this.executeCommand(`/usr/local/bin/wg-quick up /Users/${user}/.homevpn/homevpn.conf`, true).catch(e => {
            console.error('up err', e);
        });
    }

    public async wgDown(): Promise<unknown> {
        const user = window.systemInfo().username;
        return await this.executeCommand(`/usr/local/bin/wg-quick down /Users/${user}/.homevpn/homevpn.conf`, true);
    }

    async updateWgConfig(connectionResponse: ConnectResponse, pk: string): Promise<boolean> {
        const rawConfig = getConfig(connectionResponse, pk);
        const user = window.systemInfo().username;
        try {
            const result = await this.executeCommand(`echo '${rawConfig}' > /Users/${user}/.homevpn/homevpn.conf`);
            return result;
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    async executeCommand(command: string, proxy: boolean = false) {
        const result = await window.electron.invoke(
            'shell', 
            { 
                action: 'execute_command', 
                payload: {command, proxy}
            }
        );
        console.log('[CMD]' + ' ' + command, result);
        return result;
    }
}