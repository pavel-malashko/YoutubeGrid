import { Injectable } from '@angular/core';
import { SearchListResponse, RowData, Item } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url, link } from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    static mapVideoToView(list: SearchListResponse): RowData[] {
        return list.items.map((item: Item) => {
            return {
                    image: item.snippet.thumbnails.default.url,
                    publishedAt:  item.snippet.publishedAt,
                    title:  link + item.id.videoId,
                    description:  item.snippet.description,
            };
        });
    }
    constructor(private _http: HttpClient) {}
    getData(): Observable<SearchListResponse> {
        return this._http.get<SearchListResponse>(url);
    }

}
