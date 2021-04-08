import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
      return next.handle(req)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse)=>{
          let errorMsg = '';
          if (error.error instanceof ErrorEvent){
            errorMsg = `Error: ${error.error.message}`;
          }else{
            if (error.status == 404){
              errorMsg = `Message: The inventory you're looking for is not avaliable`;
            }else if(error.status == 405 || error.status == 400){
              errorMsg = `Message: Something went wrong, please check if the part number, lot number is correct`;
            }else{
              errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            
          }
          window.alert(errorMsg);
          return throwError(errorMsg)
        }
        
        )
      )
    };
}

