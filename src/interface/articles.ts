export interface IArticles {
    current_page: number;
    data: IArticle[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface IArticle {
    id: number;
    external_reference: string;
    category: Category;
    source: Source;
    news_url: string;
    image_url: null | string;
    published_date: Date;
    title: string;
    description: null | string;
    content: null | string;
    provider: Provider;
    author: string;
    created_at: Date;
    updated_at: Date;
}

export enum Category {
    Business = "business",
    Entertainment = "entertainment",
    General = "general",
    Health = "health",
    Science = "science",
}

export enum Provider {
    NewsAPI = "news_api",
    GuardianApi = 'guardian_api',
    NewYorkTimes = 'new_york_times'
}

export interface Source {
    id: null | string;
    name: string;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}
