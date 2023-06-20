export interface ConnectResponse {
    node_country: string;
    node_ip: string;
    node_port: number;
    node_public_key: string;
    client_ip: string;
    dns: Array<string>;
    mtu: number;
    allowed_ips: Array<string>;
};