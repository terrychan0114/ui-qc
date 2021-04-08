import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  result: any;
  // home_route: string;
  constructor(private http: HttpClient) { }

  getData(home_route,route,input): Observable<any>{
    // let param = new HttpParams(input);
    return this.http.get(home_route + route,{params: input})
  }
  // postData(home_route,route,opost:PostInventory): Observable<any>{
  //   // this.api_call = this.home_route + route;
  //   return this.http.post(home_route + route,opost);
  // }

  // putData(home_route,route,opost:PostInventory): Observable<any>{
  //   // this.api_call = this.home_route + route;
  //   return this.http.put(home_route + route,opost);
  // }
  
  getAllData(home_route): Observable<any>{
    // this.api_call = this.home_route + route;
    return this.http.get(home_route)
  }

}