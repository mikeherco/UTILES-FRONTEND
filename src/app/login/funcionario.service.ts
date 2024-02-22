import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Estudiante } from '../model/estudiante';
import { Login } from '../model/login';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });

  public log:any=[];
  public subject = new Subject<string>();
  private userLogged = new BehaviorSubject(this.log);
  authToken = this.userLogged.asObservable();
  role!:string

  getRole():any{
    try {
      this.authToken.subscribe(x => {
        let decodedToken:any = jwt_decode(x) 
        this.role = decodedToken.getRole();
      })
      return this.role;
      } catch(Error) {
        return null;
    }
  }

  changeAuthToken(authToken:string):string{
    this.userLogged.next(authToken);
    return this.getRole();
  }
  
  constructor(private http: HttpClient) { }

  login(login:Login){
    let url = environment.loginAPI;
    return this.http.post<string[]>(url, login, {headers: this.headers, responseType:'text' as 'json'})
      .pipe(catchError(this.handleError));
  }

  getEstudianteByCurp(curp:string){
    let url = environment.estudianteAPI + "/" + curp
    return this.http.get<Estudiante>(url).pipe(catchError(this.handleError));
  }

  getEstudianteBySolCurp(curp:string){
    let url = environment.estudianteAPI + "/solicitante/" + curp
    return this.http.get<Estudiante>(url).pipe(catchError(this.handleError));
  }

  updateEstudiante(estudiante:Estudiante){
    let url = environment.estudianteAPI;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    return this.http.put<string>(url, estudiante, { headers: header, responseType: 'text' as 'json'})
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
