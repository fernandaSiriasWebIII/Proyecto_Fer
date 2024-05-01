var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosPerfil").orderBy('edad', 'asc').get().then(function(query){
    tabla.innerHTML="";
    var salida = "";
    query.forEach(function(doc){
        salida += '<div class="col-md-2 mb-3">';
        salida += '<div class="card card-hover">';
        salida += '<img src="' + doc.data().url +'" class="card-img-top img-fluid" alt="Foto de perfil">';
        salida += '<div class="card-body">';
        salida += '<h5 class="card-title">' + doc.data().nombre + '</h5>';
        salida += '<p class="card-text">Apellidos: ' + doc.data().apellidos + '</p>';
        salida += '<p class="card-text">Edad: ' + doc.data().edad + ' años</p>';
        salida += '<p class="card-text">Correo: ' + doc.data().email + '</p>';
        salida += '<p class="card-text">Ocupación: ' + doc.data().profesion + '</p>';
        salida += '</div>';
        salida += '</div>';
        salida += '</div>';
    });
    tabla.innerHTML = '<div class="row">' + salida + '</div>';
});


