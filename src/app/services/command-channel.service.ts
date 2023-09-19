import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommandChannelService {
    constructor() {}

    async execute(cmd: string, from: 'user' | 'daemon'): Promise<any> {
        return window.electron.invoke('command', {
            action: 'command-execute',
            payload: { cmd, from }
        })
    }

    async spawn(cmd: string, args: string[]): Promise<any> {
        return window.electron.invoke('command', {
            action: 'command-spawn',
            payload: { cmd, args }
        });
    }

    async kill(pid: number): Promise<any> {
        return window.electron.invoke('command', {
            action: 'command-kill',
            payload: { pid }
        })
    }
}