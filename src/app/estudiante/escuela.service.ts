import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Escuela } from '../model/escuela';


@Injectable({
  providedIn: 'root'
})
export class EscuelaService {

  estCurp!:string;
  estValidationCurp!:string;

  private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getAllEscuela(){
    let url = environment.escuelaAPI;
    return this.http.get<Escuela[]>(url).pipe(catchError(this.handleError));
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
