import { ConnectResponse } from "../models/interfaces/connect-response.interface";

export function getConfig(config: ConnectResponse, privateKey: string): string {
    return `[Interface]\nAddress = ${config.client_ip}\nPrivateKey = ${privateKey}\nMTU = ${config.mtu}\nDNS = ${config.dns.join(", ")}\nListenPort = 51820\n\n[Peer]\nEndpoint = ${config.node_ip}:${config.node_port}\nPublicKey = ${config.node_public_key}\nAllowedIPs = ${config.allowed_ips}\nPersistentKeepalive = 1`;
}