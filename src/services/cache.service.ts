import {IObject} from "../interface/interface.ts";

class CacheService {

    saveToCache(key: string, value: string | IObject) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getFromCache(key: string): string | IObject | null {

        const getValue = localStorage.getItem(key);

        if (!getValue) return null;

        return JSON.parse(getValue);
    }

    getToken(): string | IObject | null {
        return this.getFromCache('token');
    }

    login(token: string, user: IObject) {
        this.saveToCache('token', token);
        this.saveToCache('user', user);
    }

    clearCache() {
        localStorage.clear();
    }

}

export default new CacheService();
