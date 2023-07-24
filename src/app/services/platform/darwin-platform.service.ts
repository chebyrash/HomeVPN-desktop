import { Injectable } from '@angular/core';
import { ConnectResponse } from 'src/app/models/interfaces/connect-response.interface';
import { getConfig } from 'src/app/utils/get-config';

@Injectable({
    providedIn: 'root'
})
export class DarwinService {
    constructor() {}

    public async wgUp(): Promise<unknown> {
        return await this.executeCommand(`/usr/local/bin/wg-quick up /usr/local/share/homevpn/homevpn.conf`, true).catch(e => {
            console.error('up err', e);
        });
    }

    public async wgDown(): Promise<unknown> {
        return await this.executeCommand(`/usr/local/bin/wg-quick down /usr/local/share/homevpn/homevpn.conf`, true);
    }

    async updateWgConfig(connectionResponse: ConnectResponse, pk: string): Promise<boolean> {
        const rawConfig = getConfig(connectionResponse, pk);
        try {
            const result = await this.executeCommand(`echo '${rawConfig}' > /usr/local/share/homevpn/homevpn.conf`);
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