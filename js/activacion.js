/*
 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 
  VERIFICACION DE RFC
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
*/


/*
 |||||||||||||||||||||||||||||||||||||||||||||||
   Función -  verifica
 |||||||||||||||||||||||||||||||||||||||||||||||
*/

/*

1.- Se crea la const ClienteRFC para guardar los datos que vienen del html con el getElementById
2.- AXIOS - Se hace un POST a la url del servicio y se manda la la const del html
3.- Se revisa el status de la respuesta
4.- Se recibe la respuesta en res.data
5.- Se ejecuta la lógica correspondiente a la respuesta obtenida
6.- Mensajes de alerta o exito
7.- Redireccionamiento a url de ...

*/
async function verifica() {
    const ClienteRFC= {
      rfc: document.getElementById("rfc").value   
    }; 
  
    await axios 
    // .post("http://localhost:8082/api/prueba/login", ClienteRFC) 
      .post("https://hback-test.herokuapp.com/api/activacion/RFC", ClienteRFC) //url de servicio post y la const del html 
    
      .then(res => {  // Revisa la respuesta del POST

        if (res.request.status == 200) {
        var retorno = res.data;   // el resultado del query llega a res.data
        console.log (retorno);
        // console.log (retorno[0].idAdministrador);
        console.log (retorno.length);

      

          if (retorno.length == 0 ) {
            console.log ('Error en el login')
            window.alert("Correo/contraseña incorrecta");
          }
            else {

            if (retorno.length == 1 ) { 
              console.log ('Si existe el usuario')
              location.href = "http://localhost:8081/home.html"; 
            }
          }
      }
      // console.log (retorno[0].idAdministrador);
      return retorno;
    })

      .catch(err => {
        if (err.request.status == 404) {
            window.alert("Problema con la petición");
        }
      })

}



/*
 |||||||||||||||||||||||||||||||||||||||||||||||
   Función -  Activa
 |||||||||||||||||||||||||||||||||||||||||||||||
*/

async function activa() {
    const ClienteToken= {
      rfc: document.getElementById("token").value   
    }; 