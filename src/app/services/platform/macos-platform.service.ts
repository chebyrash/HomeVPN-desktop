import { Injectable } from '@angular/core';
import { PlatformService } from './platform-service';
import { ConnectResponse } from 'src/app/models/interfaces/connect-response.interface';
import { WG_INTERFACE_NAME } from 'src/app/models/constants/wg-interface-name.const';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable, catchError, from, map, of, switchMap, tap } from 'rxjs';
import { MainResponse } from 'src/app/models/interfaces/main-response.interface';

@Injectable({
    providedIn: 'root'
})
export class MacosPlatformService extends PlatformService {
    main$ = new BehaviorSubject<MainResponse | null>(null);

    constructor() {
        super()
    }

    public async checkInstallation() {
        try {
            const response = await this.executeCommand('wg', false);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    public connect(country: string): Observable<unknown> {
        const { privateKey, publicKey } = window.wireguard.generateKeypair();

        return this.apiService.connect({country, public_key: publicKey}).pipe(
            map(response => this.generateRawWgConfig(response, privateKey)),
            switchMap(rawConfig => from(this.writeConfigToFilesystem(rawConfig))),
            switchMap(() => from(this.wgUp())),
            map(() => true),
            catchError(() => of(false))
        )
    }

    async writeConfigToFilesystem(rawConfig: string): Promise<boolean> {
        const configPath = '/etc/wireguard';
        try {
            const cmd = [
                `touch ${configPath}/${WG_INTERFACE_NAME}.conf || true`,
                `echo "${rawConfig}" > ${configPath}/${WG_INTERFACE_NAME}.conf`
            ].join(' && ');
            return await this.executeCommand(cmd);
        } catch(error) {
            console.log(error);
            return false;
        }
    }

    public async wgUp(): Promise<unknown> {
        return await this.executeCommand(`/usr/local/bin/wg-quick up /etc/wireguard/homevpn.conf`).catch(e => {
            console.error('up err', e);
        });
    }

    public async wgDown(): Promise<unknown> {
        return await this.executeCommand(`wg-quick down /etc/wireguard/homevpn.conf`).catch(e => {
            console.error('down err', e);
        });
    }

    generateRawWgConfig(config: ConnectResponse, privateKey: string): string {
        return [
            `[Interface]`,
            `Address = ${config.client_ip}`,
            `PrivateKey = ${privateKey}`,
            `MTU = ${config.mtu}`,
            `DNS = ${config.dns.join(", ")}`,
            `ListenPort = 51820`,
            ``,
            `[Peer]`,
            `Endpoint = ${config.node_ip}:${config.node_port}`,
            `PublicKey = ${config.node_public_key}`,
            `AllowedIPs = ${config.allowed_ips}`,
            `PersistentKeepalive = 1`,
        ].join("\n");
    }
}