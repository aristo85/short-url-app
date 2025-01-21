export type ShorturlInfo = {
  originalUrl: string;
  createdAt: Date;
  clickCount: number;
  shortUrl: string;
};

export type Shorturl = {
  originalUrl: string;
};

export type ShorturlsResponse = {
  shortUrls: string[];
};
