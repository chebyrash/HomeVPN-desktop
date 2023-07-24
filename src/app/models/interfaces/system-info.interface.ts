export interface SystemInfo {
    arch: string;
    os_version: string;
    platform: string;
    user: {
        gid: number;
        homedir: string;
        shell: string;
        uid: number;
        username: string;
    }
}