import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Estudiante } from '../model/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

public data:any = [];
public subject = new Subject<string>();
private solicitanteCurp =new BehaviorSubject(this.data);
currentMessage = this.solicitanteCurp.asObservable();

changeSolicitanteCurp(curp:string){
  this.solicitanteCurp.next(curp);
}

getAllEstudiantes(){
  let url = environment.allEstudianteAPI;
  return this.http.get<string[]>(url).pipe(catchError(this.handleError));
}
//getEstudianteByCurp(){
//  
//}
//
//getEstudianteBySolCurp(){
//
//}

registerEstudiante(estudiante:Estudiante){
  const url = environment.estudianteAPI;
  return this.http.post<string>(url, estudiante, {headers: this.headers, responseType:'text' as 'json'})
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
