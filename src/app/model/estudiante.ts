import { Escuela } from "./escuela";
import { Estado } from "./estado";
import { Genero } from "./genero";

export class Estudiante{
    estudianteId!: string;
    curp!:string;
    nombre!:string;
    primerApellido!:string;
    segundoApellido!:string;
    sexo!:string;
    genero!:Genero;
    fechaNacimiento!:string;
    edad!:number;
    nivelEscolar!:string;
    grado!:string;
    estado!:Estado;
    escuela!:Escuela;
    solCurp!:string;
}
