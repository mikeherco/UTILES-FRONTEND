const HOSTNAME: string = "localhost";
const PORT_NUMBER: number = 8080;
const APPLICATION_NAME: string = 'gobnl';

export const environment = {
  production: false,
  solicitanteAPI: APPLICATION_NAME + '/solicitante',
  estudianteAPI: APPLICATION_NAME + '/estudiante',
  allEstudianteAPI: APPLICATION_NAME + '/estudiantes',
  escuelaAPI: APPLICATION_NAME + '/escuela',
  direccionAPI: APPLICATION_NAME + '/direccion',
  loginAPI: APPLICATION_NAME + '/login',
  municipiosAPI: '/rest/v1/marco-geoestadistico-inegi/municipio/?clave_entidad=19&fields=nombre,clave_geoestadistica&format=json',
  coloniasAPI: '/rest/v1/implanc/colonia/?clave_entidad=19&fields=nombre,id&limit=1122&format=json'
};