import { Estado } from "./estado";
import { Genero } from "./genero";

export class Solicitante {
    solicitanteId!: string;
    curp:any;
    nombre:any;
    primerApellido:any;
    segundoApellido:any;
    sexo:any;
    genero!:Genero;
    fechaNacimiento:any;
    edad!:number;
    estado!:Estado;
}