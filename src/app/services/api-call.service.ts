import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface ApiResponse {
  status: string;
  statusCode: number;
  version: string;
  access: string;
  total: number;
  offset: number;
  limit: number;
  data: Record<string, CountryInfo>;
}


interface CountryInfo {
  country: string;
  region: string;
}


@Injectable({
  providedIn: 'root'
})


export class ApiCallService {

  constructor(private _http: HttpClient) { }


  getCountryList(): Observable<ApiResponse> {
    let url = 'https://api.first.org/data/v1/countries';
    return this._http.get<ApiResponse>(url);
  }

}
