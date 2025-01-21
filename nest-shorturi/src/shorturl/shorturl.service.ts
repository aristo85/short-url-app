import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class ShortUrlService {
    private urlMap = new Map<string, { originalUrl: string, createdAt: Date, clickCount: number }>();
    private findShortUrlByOriginal(originalUrl: string): string | undefined {
        for (const [shortUrl, urlEntry] of this.urlMap.entries()) {
            if (urlEntry.originalUrl === originalUrl) {
                return shortUrl;
            }
        }
        return undefined;
    }
    
    shortenUrl(originalUrl: string): string {
        const existingShortUrl = this.findShortUrlByOriginal(originalUrl);
        if (existingShortUrl) {
            return existingShortUrl;
        }
        const shortUrl = randomBytes(3).toString('hex');
        const createdAt = new Date();
        this.urlMap.set(shortUrl, { originalUrl, createdAt, clickCount: 0 });
        return shortUrl;
    }

    getShortUrls(): string[] {
        return Array.from(this.urlMap.keys());
    }
    
    getOriginalUrl(shortUrl: string): string | undefined {
        const urlEntry = this.urlMap.get(shortUrl);
        if (urlEntry) {
            urlEntry.clickCount++;
            return urlEntry.originalUrl;
        }
        return undefined;
    }

    getUrlInfo(shortUrl: string): { originalUrl: string, createdAt: Date, clickCount: number } | undefined {
        const urlEntry = this.urlMap.get(shortUrl);
        return urlEntry;
    }

    deleteShortUrl(shortUrl: string): boolean {
        return this.urlMap.delete(shortUrl);
    }
}
