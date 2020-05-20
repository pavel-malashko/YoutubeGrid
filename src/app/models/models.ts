import { GridApi, ColumnApi } from 'ag-grid-community';

export class RowData {
    image: string;
    publishedAt: string;
    title: string;
    description: string;

    constructor(init: Partial<RowData>) {
        Object.assign(this, init);
    }
}

export class SearchListResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: PageInfo;
    items: Item[];
}

export interface Item {
    kind: string;
    etag: string;
    id: ID;
    snippet: Snippet;
}

export interface ID {
    kind: string;
    videoId: string;
}

export interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
}

export interface Thumbnails {
    default: Default;
    medium: Default;
    high: Default;
}

export interface Default {
    url: string;
    width: number;
    height: number;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface Params {
    api: GridApi;
    columnApi: ColumnApi;
    context: any;
    [key: string]: any;
}
