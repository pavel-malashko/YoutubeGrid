import { Injectable } from '@angular/core';
import { SearchListResponse } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private _http: HttpClient) {}

    getData(): Observable<SearchListResponse> {
        return this._http.get<SearchListResponse>(url);
    }
}
