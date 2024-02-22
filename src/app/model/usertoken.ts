import { Authorities } from "./authorities";

export class UserToken{
    sub!:string;
    exp!:number;
    iat!:number;
    authorities!:Authorities[];
    username!:string;
}