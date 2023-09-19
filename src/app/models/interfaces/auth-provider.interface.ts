export interface AuthProvider {
    token: string;
    provider: 'apple' | 'google';
}