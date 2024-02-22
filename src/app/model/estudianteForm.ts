import { Escuela } from "./escuela";

export class EstudianteForm{
    curp!:string;
    nombre!:string;
    primerApellido!:string;
    segundoApellido!:string;
    sexo!:string;
    genero!:string;
    fechaNacimiento!:string;
    edad!:number;
    nivelEscolar!:string;
    grado!:string;
    estado!:string;
    escuela!:Escuela;
    solCurp!:string;
}