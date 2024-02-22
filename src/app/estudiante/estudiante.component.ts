import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from './estudiante.service';
import { Escuela } from '../model/escuela';
import { EscuelaService } from './escuela.service';
import { Estudiante } from '../model/estudiante';
import { Estado } from '../model/estado';
import { Genero } from '../model/genero';
import { CurrencyPipe } from '@angular/common';
import { EstudianteForm } from '../model/estudianteForm';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent  implements OnInit {
  estudianteForm!: FormGroup;
  est!:EstudianteForm;
  estudiante!:Estudiante;

  estudianteList:string[] = [];

  solCurp!:string;
  escuela:Escuela[] = [];
  escuelaDisplay!:string[];

  selectedEscuela!:Escuela;
  selectedNivelEscolar:string = "";
  gradoDisplay:string[] =[];
  errorMessage: string ="";
  successMessage: any = "";

  show:boolean = true;
  validCurp:boolean = true;
  

  constructor(private fb: FormBuilder, private router: Router, private estSer:EstudianteService, private escuelaSer:EscuelaService){
    this.estudiante = new Estudiante();
    this.estudiante.estado = new Estado();
    this.estudiante.genero = new Genero();
    this.getAllEscuela();
    
    this.estSer.currentMessage.subscribe( curp => (this.solCurp = curp));
  }
  ngOnInit(): void {
    this.createForm();
    this.getAllEstudiantes();
  }
  
  createForm(){
    this.estudianteForm = this.fb.group({
      curp: ["", [Validators.required]],
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
    })
  }
  setGrado(){
    if(this.selectedNivelEscolar.match("Primaria"))
      this.gradoDisplay = ["1", "2", "3", "4", "5", "6"];
    else
      this.gradoDisplay = ["1", "2", "3"];
  }
  

  submit(){
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
    this.estudiante.solCurp = this.solCurp;
    
    if(this.validateEstudianteNotRegistered(this.estudiante.curp))
      this.registerEstudiante(this.estudiante);
    this.show = false;
  }

  validateEstudianteNotRegistered(curp:string): boolean {
    console.log(this.estudianteList)
    this.estudianteList.forEach(x => {
      if(x.match(curp))
        this.validCurp = false;
    })
    console.log(this.validCurp);
      return this.validCurp;
  }
  registerEstudiante(request: Estudiante){
    this.estSer.registerEstudiante(request).subscribe(
      message => {
        this.successMessage = message;
      },
      error => {this.errorMessage = <any>error
      console.log(console.error);
      }
    )
    
  }

  getAllEscuela(){
    this.escuelaSer.getAllEscuela().subscribe(
      e =>  this.escuela = e );
  }
  getAllEstudiantes(){
    this.estSer.getAllEstudiantes().subscribe(
      res => { 
        if(res!= null)
        res.forEach(c => this.estudianteList.push(c));
      }) 
  }

  reset(){
    this.estudianteList= [];
    this.selectedNivelEscolar = " ";
    this.validCurp = true;
    this.show = true;
    this.estudianteForm.reset();
    this.successMessage = "";
    this.errorMessage="";
    this.getAllEstudiantes();
  }
}

