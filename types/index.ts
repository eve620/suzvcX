export interface SafeUser {
    id: number,
    account: string
    username: string,
    bio: string | null,
    image: string | null,
    role: string
}