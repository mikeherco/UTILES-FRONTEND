import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Direccion } from '../model/direccion';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Municipio } from '../model/municipio';
import { Colonia } from '../model/colonia';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
constructor(private http: HttpClient) {}

getMunicipio(): Observable<Municipio>{
  let url = environment.municipiosAPI;
  return this.http.get<Municipio>(url)
  .pipe(catchError(this.handleError));
}
getColonia(){
  let url = environment.coloniasAPI;
  return this.http.get<Colonia>(url)
  .pipe(catchError(this.handleError));
}

registerDireccion(direccion:Direccion){
let url = environment.direccionAPI;
return this.http.post<string>(url, direccion, { headers : this.headers, responseType: 'text' as 'json' })
  .pipe(catchError(this.handleError))
}

private handleError(err: HttpErrorResponse) {
  console.log(err)
  let errMsg: string = '';
  if (err.error instanceof Error) {
      console.log("1" + err.error.message)
      errMsg = err.error.message;
      console.log(errMsg)
  }
  else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).errorMessage
  }
  else {
      if (err.status == 0) {
          errMsg = "A connection to back end can not be established.";
      } else {
          errMsg = err.error.message;
      }
  }
  return throwError(errMsg);
}
}
