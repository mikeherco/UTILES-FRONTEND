import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitante } from '../model/solicitante';
import { Genero } from '../model/genero';
import { Estado } from '../model/estado';
import { SolicitanteForm } from '../model/solicitanteForm';
import { SolicitanteService } from './solicitante.service';
import { Direccion } from '../model/direccion';
import { DireccionService } from './direccion.service';
import { Municipio } from '../model/municipio';
import { Colonia } from '../model/colonia';
import { EstudianteService } from '../estudiante/estudiante.service';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrls: ['./solicitante.component.css']
})
export class SolicitanteComponent implements OnInit{
  solicitanteForm!: FormGroup;
  direccionForm!: FormGroup;
  sol!:SolicitanteForm;

  solicitante!:Solicitante;
  direccion!:Direccion;
  curp!:string;

  munList!:Municipio;
  munDisplay:Municipio = new Municipio();
  selectedMunicipio!:string;

  colList!:Colonia;
  colDisplay:Colonia = new Colonia();

  show:boolean = true;
  
  errorMessage!: string ;
  successMessage: string ="";
  dirsuccessMessage: string ="";

  constructor(private fb: FormBuilder, private router: Router, private solSer: SolicitanteService, 
    private dirSer:DireccionService, private estSer:EstudianteService){
    this.solicitante = new Solicitante();
    this.solicitante.genero = new Genero();
    this.solicitante.estado = new Estado();
    this.direccion = new Direccion();
  }
  ngOnInit() {
    this.createForm();
    this.getMunicipios();
  }
  
createForm(){
    this.solicitanteForm = this.fb.group({
        curp: ["", [Validators.required]],
        nombre: ["", [Validators.required]],
        primerApellido: ["", [Validators.required]],
        segundoApellido: ["", [Validators.required]],
        sexo:["", [Validators.required]],
        genero: ["", [Validators.required]],
        fechaNacimiento:["", [Validators.required]],
        edad:["", [Validators.required]],
        estado:["", [Validators.required]] });
    this.direccionForm = this.fb.group({
      curp:[{value:this.solicitante.curp, disabled: true}],
      municipio: ["", Validators.required],
      colonia: ["", [Validators.required]],
      calle: ["", [Validators.required]],
      numeroExt: ["", [Validators.required]],
      numeroInt:["", [Validators.required]],
      codigoPostal: ["", [Validators.required]],
      telefono:["", [Validators.required]] });
  }

  submit(){
    if(this.show){
    this.sol = this.solicitanteForm.value as SolicitanteForm;
    this.solicitante.curp = this.sol.curp;
    this.solicitante.nombre =this.sol.nombre;
    this.solicitante.primerApellido = this.sol.primerApellido;
    this.solicitante.segundoApellido = this.sol.segundoApellido;
    this.solicitante.sexo = this.sol.sexo;
    this.solicitante.genero.id = this.sol.genero
    if(this.sol.genero.match("1"))
      this.solicitante.genero.nombre = "Masculino";
    else
      this.solicitante.genero.nombre = "Femenino";
    this.solicitante.fechaNacimiento = this.sol.fechaNacimiento;
    this.solicitante.edad = this.sol.edad;
    this.solicitante.estado.nombre = this.sol.estado;
    this.registerSolicitante(this.solicitante)
    this.successMessage = "hola"
    this.show = false;
    }
    else{
      this.direccion = this.direccionForm.value as Direccion;
      this.direccion.solCurp = this.solicitante.curp;
      this.dirsuccessMessage = "hola"
      this.registerDireccion(this.direccion);
    }
  }

  getMunicipios(){
    this.dirSer.getMunicipio().subscribe(
      municipio => {
        this.munList = municipio;
        this.munDisplay = this.munList;
      });
  }
  getColonia(){
    this.dirSer.getColonia().subscribe(
      colonia =>{
      this.colList = colonia;
      this.colDisplay = this.colList;
      });
  }

  registerDireccion(direccion: Direccion){
    this.dirSer.registerDireccion(direccion)
        .subscribe(
          message => {
            this.dirsuccessMessage = message;
            this.direccionForm.reset();
          }
          , error => this.errorMessage = <any> error
        );
  }
  registerSolicitante(solicitante:Solicitante){
    this.solSer.registerSolicitante(solicitante)
        .subscribe(
            message => {
                this.successMessage = message;
                this.estSer.changeSolicitanteCurp(this.solicitante.curp);
                this.solicitanteForm.reset();
            }
            , error => this.errorMessage = <any>error
        );  
  }
}
