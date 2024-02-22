import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { FuncionarioService } from './funcionario.service';
import { Estudiante } from '../model/estudiante';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteForm } from '../model/estudianteForm';
import { Escuela } from '../model/escuela';
import { EscuelaService } from '../estudiante/escuela.service';
import jwt_decode from 'jwt-decode';
import { UserToken } from '../model/usertoken';
import { Route, Router } from '@angular/router';
import { Genero } from '../model/genero';
import { Estado } from '../model/estado';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  estudianteForm!:FormGroup;
  loginForm!:FormGroup;

  login:Login = new Login();
  token:UserToken[] = [];
  
  est!:EstudianteForm;
  estudiante:Estudiante = new Estudiante();
  selectedNivelEscolar:string = "";
  escuela:Escuela[] = [];
  selectedEscuela!:Escuela;
  gradoDisplay:string[] =[];

  successMessage:string = "";
  errorMessage:string = "";
  
  byCurpSol:boolean = false;
  byCurp:boolean = false;
  show:boolean = true;
  isSuperAdmin:boolean = false;
  
  constructor(private fb:FormBuilder, private funSer:FuncionarioService, private escuelaSer:EscuelaService, private router:Router){
    this.getAllEscuela();
    this.estudiante.genero = new Genero();
    this.estudiante.escuela = new Escuela();
    this.estudiante.estado = new Estado();
   }

  ngOnInit(): void {
    this.createForm();
  }  
  createForm(){
    this.estudianteForm = this.fb.group({
      curp: ["", [Validators.required ]],
      nombre: ["", [Validators.required]],
      primerApellido: ["", [Validators.required]],
      segundoApellido: ["", [Validators.required]],
      sexo:["", [Validators.required]],
      genero: ["", [Validators.required]],
      fechaNacimiento:["", [Validators.required]],
      edad:["", [Validators.required]],
      estado:["", [Validators.required]],
      nivelEscolar:["", [Validators.required]],
      grado:["", {disabled : this.selectedNivelEscolar != 'Preescolar'}],
      escuela:["", [Validators.required]],
      solCurp:["", [Validators.required]]
    });
     this.loginForm= this.fb.group({
      username:["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }
  onSubmit(){
    this.funSer.login(this.login).subscribe( t => { 
      this.token.push(jwt_decode(t.toString()));}, 
      error =>{ this.errorMessage = <any> error 
        this.router.navigate(['/']);
    });
      this.token.forEach(x =>{ this.isSuperAdmin = (x.authorities[0].authority =="ROLE_SUPERADMIN") });
    this.show = !this.show;
    if(this.isSuperAdmin){
      this.estudianteForm.enable();
    }
    else{
      this.estudianteForm.disable()
    }
  }
  submit(curp:string){
    this.est = this.estudianteForm.value as EstudianteForm;
    this.estudiante.curp = this.est.curp;
    this.estudiante.nombre = this.est.nombre;
    this.estudiante.primerApellido = this.est.primerApellido
    this.estudiante.segundoApellido = this.est.segundoApellido;
    this.estudiante.sexo = this.est.sexo;
    this.estudiante.genero.id = this.est.genero;
    if(this.est.genero.match("1"))
      this.estudiante.genero.nombre = "Masculino";
    else
      this.estudiante.genero.nombre = "Femenino";
    this.estudiante.fechaNacimiento = this.est.fechaNacimiento;
    this.estudiante.edad = this.est.edad;
    this.estudiante.nivelEscolar = this.est.nivelEscolar;
    this.estudiante.grado = this.est.grado;
    this.estudiante.estado.nombre = this.est.estado;
    this.estudiante.escuela = this.est.escuela;
    this.estudiante.solCurp = this.est.solCurp;
    this.upateEstudiante(this.estudiante);
  }

  getEstudianteByCurp(curp:string){
    
    this.funSer.getEstudianteByCurp(curp).subscribe(
      res => {this.estudiante = res
        });
        if(this.estudiante.grado == null){
          this.estudiante.grado = '0';
        }
    console.log(this.estudiante);
  }
  getEstudianteBySolCurp(curp:string){
    this.funSer.getEstudianteBySolCurp(curp).subscribe(
      res => {this.estudiante = res
        console.log(res);
        console.log("display");
        });
      if(this.estudiante.grado == null){
        this.estudiante.grado = '0';
      }
    console.log(this.estudiante);
  }

  upateEstudiante(estudiante:Estudiante){
    this.funSer.updateEstudiante(estudiante).subscribe(
      message => {
        this.successMessage = message;
      }
      ,error => this.errorMessage = <any> error
      
    )
  }

  getAllEscuela(){
    this.escuelaSer.getAllEscuela().subscribe(
      e =>  this.escuela = e );
  }
  setGrado(){
    this.selectedNivelEscolar = this.estudiante.nivelEscolar
    if(this.selectedNivelEscolar.match("Primaria"))
      this.gradoDisplay = ["1", "2", "3", "4", "5", "6"];
    else
      this.gradoDisplay = ["1", "2", "3"];
  }

  reset(){
    this.estudianteForm.reset();
  }
}