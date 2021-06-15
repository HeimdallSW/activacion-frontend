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
    console.log(ClienteRFC);
   
    var retorno = ""; //variable que guarda los datos del res
    await axios 
    // .post("http://localhost:8082/api/prueba/login", ClienteRFC) 
      .post("https://back-activacion.herokuapp.com/api/activacion/RFC", ClienteRFC) //url de servicio post y la const del html 
    
      .then(res => {  // Revisa la respuesta del POST

        if (res.request.status == 200) {
        var retorno = res.data;   // el resultado del query llega a res.data
        console.log (retorno[0].resultado); 
      }
      
      if (retorno[0].resultado == 0 ) {
        console.log ('El RFC no existe en la base')
        // window.alert("El RFC no existe en la base");
        // alertify.error("El RFC no existe en la base");
        // alertify.set('notifier','position', 'top-center');
        // alertify.error("Ups! No tenemos ese RFC registrado");
        alertify.dialog('Ups!').set({transition:'pulse',message: 'Ups! No tenemos ese RFC registrado'}).show();
      } 
      else {
        if (retorno[0].resultado > 0 ) {
          console.log ('RFC encontrado')
          location.href = "https://back-activacion.herokuapp.com/activacion"; 
      }
    }
      return retorno;
    })

      .catch(err => {
        if (err.request.status == 404) {
            window.alert("Problema con la petición");
        }
      })

};



/*
 |||||||||||||||||||||||||||||||||||||||||||||||
   Función -  Activa
 |||||||||||||||||||||||||||||||||||||||||||||||
*/

async function activarCliente() {
    const ClienteToken= {
      digito1: document.getElementById("Code1").value,
      digito2: document.getElementById("Code2").value,
      digito3: document.getElementById("Code3").value,
      digito4: document.getElementById("Code4").value,
      digito5: document.getElementById("Code5").value,
      digito6: document.getElementById("Code6").value,

      token:digito1+digito2+digito3+digito4+digito5+digito6
    }
    
    console.log(ClienteToken);
    await axios 
      .post("https://back-activacion.herokuapp.com/api/activacion/token", ClienteToken) //url de servicio post y la const del html 
    
      .then(res => {  // Revisa la respuesta del POST

        if (res.request.status == 200) {
        var retorno = res.data;   // el resultado del query llega a res.data
        console.log (retorno[0].resultado); 
      }
      
      if (retorno[0].resultado == 0 ) {
        console.log ('El token no es correcto verifiquelo')
        window.alert("El token no es correcto verifiquelo");
        // alertify.error("El RFC no existe en la base");
        // alertify.set('notifier','position', 'top-center');
        // alertify.error("Ups! No tenemos ese RFC registrado");
        alertify.dialog('Ups!').set({transition:'pulse',message: 'Ups! el token no es correcto verifiquelo'}).show();
      } 
      else {
        if (retorno[0].resultado > 0 ) {
          console.log ('Token verificado')
      }
    }
      return retorno;
    })

      .catch(err => {
        if (err.request.status == 404) {
            window.alert("Problema con la petición");
        }
      })
};