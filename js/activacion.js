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
async function verificarRFC() {
    const ClienteRFC= {
      rfc: document.getElementById("rfc").value   
    }; 
    // console.log(ClienteRFC); // log
   
    var retorno = ""; //variable que guarda los datos del res
    await axios 
    // .post("http://localhost:8082/api/prueba/login", ClienteRFC) 
      .post("https://back-activacion.herokuapp.com/api/activacion/RFC", ClienteRFC) //url de servicio post y la const del html 
    
      .then(res => {  // Revisa la respuesta del POST

        if (res.request.status == 200) {
        var retorno = res.data;   // el resultado del query llega a res.data
        // console.log (retorno[0].resultado); // log
      }


      switch (true) {

        case retorno[0].resultado == 0:
          // console.log ('El RFC no existe en la base') // log

            var proxied = window.alert;
            window.alert = function() {
              $("#RFCincorrectoModal .modal-dialog")
              $("#RFCincorrectoModal").modal('show');
            };
      
          alert('');
          
          break;

          case retorno[0].resultado > 0:

          console.log ('RFC encontrado')
  
          location.href = "https://back-activacion.herokuapp.com/activacion"; 
          
          break;
      
          default:
            console.log ('default')
        }
        
        return retorno;
     
      })


      .catch(err => {
        if (err.request.status == 500) {
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

  

    const digito1 = document.getElementById("Code1").value
    const digito2 = document.getElementById("Code2").value
    const digito3 = document.getElementById("Code3").value
    const digito4 = document.getElementById("Code4").value
    const digito5 = document.getElementById("Code5").value
    const digito6 = document.getElementById("Code6").value

    const ClienteToken= {
      token:digito1+digito2+digito3+digito4+digito5+digito6
    }

   

    console.log(ClienteToken);

    var respuesta = "";
    await axios 
    .post("https://back-activacion.herokuapp.com/api/activacion/token", ClienteToken) //url de servicio post y la const del html 
  
    .then(res => {  // Revisa la respuesta del POST

      if (res.request.status == 200) {
      var respuesta = res.data;   // el resultado del query llega a res.data
      console.log (respuesta.status);
      // console.log (respuesta[0].status); 
    }

    switch (respuesta.status) {
      case 'TNF':
        console.log('No encontramos el código');

        (function() {
          var codigoIncorrecto = window.alert;
          window.alert = function() {
            $("#codigoIncorrectoModal .modal-dialog")
            $("#codigoIncorrectoModal").modal('show');
          };
        })();
        alert('');
        
        break;

      case 'NM':
          console.log('El token no coincide con el RFC');
          // alertify.confirm('El token no coincide con el RFC').set('closable', false); 
          //  window.alert("No encontramos el Token");
          
          break;

          case 'SA':

         //  var fecha = document.getElementById("fecha").textContent
         // console.log(fecha);

        var fecha = document.getElementById("fecha"); //  Adquiere el valor del elemento de HTML con id= fecha
        fecha.textContent = respuesta.fecha;          // Cambia el contenido de lo que tiene fecha por el valor de fecha de la respuesta del servidor
           
       console.log('FELICIDADES: El software esta Activo');
     //  console.log(respuesta.fecha);
       
            (function() {
              var proxied = window.alert;
              window.alert = function() {
                $("#softwareActivadoModal .modal-dialog")
                $("#softwareActivadoModal").modal('show');
              };
            })();
            alert('');
          
      
            break;

        case 'SAA':
            console.log('El software ya esta activado');
            console.log(respuesta.fecha); 
            alertify.confirm('El software ya esta activado y se activo el día ' + respuesta.fecha).set('closable', false); 
            break;
  
      default:
        console.log('Respuesta no valida');
    }
    
    return respuesta;
 
  })

    .catch(err => {
      if (err.request.status == 500) {
          window.alert("Problema con la petición");
      }
    })


};