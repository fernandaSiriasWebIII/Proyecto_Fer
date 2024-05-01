// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtNombre = document.querySelector('#txtNombre');
const txtApellidos = document.querySelector('#txtApellidos');
const txtEmail = document.querySelector('#txtEmail');
const txtEdad = document.querySelector('#txtEdad');
const txtProfesion  = document.querySelector('#txtProfesion');
const txtDescripcion = document.querySelector('#txtDescripcion');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('usuario/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( url =>{
                db.collection("datosPerfil").add({
                    "nombre" :      txtNombre.value,
                    "apellidos" :   txtApellidos.value,
                    "email" :       txtEmail.value,
                    "edad":         parseInt(txtEdad.value),
                    "profesion" :   txtProfesion.value,
                    "descripcion":  txtDescripcion.value,
                    "url"   :       url
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    txtNombre.value = ''
    txtApellidos.value = '';
    txtEmail.value = '';
    txtEdad.value = '';
    txtProfesion.value = '';
    txtDescripcion.value = '';
    txtArchi.value = '';
    txtNombre.focus();
}