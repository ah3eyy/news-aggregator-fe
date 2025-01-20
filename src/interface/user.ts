export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: null;
    created_at: Date;
    updated_at: Date;
}


export interface ISavePreference {
    categories: string[];
    authors: string[];
    sources: string[]
}
