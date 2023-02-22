export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type LatestNewsResultsTypes = {
  title: string;
  link: string;
  keywords: null;
  creator: string[];
  video_url: null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  category: string[];
  country: string[];
  language: string;
};

export type SearchLatestNews = {
  url: string;
};
export type FetchLatestNews = {
  status: string;
  totalResults: number;
  results: LatestNewsResultsTypes[];
  nextPage: string;
};

export interface LatestNewsState {
  fetchResponse?: FetchLatestNews;
  news?: LatestNewsResultsTypes[];

  number?: {}[];

  status: Status;
}
