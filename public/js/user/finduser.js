
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

var autor = document.getElementById("autor")
var correo = document.getElementById("correo")
var edad = document.getElementById("edad")
correo.addEventListener("input", ()=>{
    var datos= db.collection("datosPerfil")
    datos.where("email", "==", correo.value).get().then((snapshot) => {
        snapshot.forEach((query) => {
            if(correo.value == query.data().email){
                //console.log(query.data().email)
                autor.value = query.data().nombre + " " + query.data().apellidos
                edad.value = query.data().edad    
            } else if (correo.value != query.data().email){
                //console.log(query.data().email)
                autor.value = "No corresponde"
                edad.value = ""
            }
            
        })
    })
        
    //query.forEach(function(doc){
      //  var nombreCompleto = doc.data().nombre + " " + doc.data().apellidos;
       // autor.value = nombreCompleto;
        //edad.value = doc.data().edad;
    //}); 
});


var enviar = document.getElementById("Enviar");
var archivoComponent = document.getElementById("archivo");
var categoria = document.getElementById("categoria");

enviar.addEventListener('click', ()=>{
    var userRef = firebase.firestore().collection("datosPerfil");
    var correoBuscado = correo.value;
    var correoFinded = "";
    userRef.where("email", "==", correoBuscado)
            .get()
            .then(function(emailSnap){
                emailSnap.forEach(function(doc){
                    correoFinded = doc.id;
                    console.log("El coreo es: ", doc.data(), "El id del documento es: ", doc.id)
                })
            })
            .catch(function(error){
                alert("El correo no ah sido encontrado: ", error)
            })
    const archivo = archivoComponent.files[0];
    const fileName = archivo.name;
    alert(fileName)
    if(archivo == null){
        alert("Debe de seleccionar un archivo")
    }else {
        const metadata = {
            contenType : archivo.type
        } 
        const subirArchi = container.child('archivoPDF/'+fileName).put(archivo, metadata);
        subirArchi
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then( url => {
                db.collection("pdfsInformacion").add({
                    "userID" : correoFinded,
                    "categoria": categoria.value,
                    "revision": "false",
                    "url": url
                }).then(function(docRef){
                    alert("ID del Registro: ", docRef.id);
                    window.location.href = "uploadFile.html"
                }).catch(function(FirebaseError) {
                    alert("Error al subir el archivo: ", FirebaseError)
                })
        })
    }
})



function changed(){
    var userRef = firebase.firestore().collection("pdfsInformacion");
    var componentArchivos = document.getElementById("archivos")
    var salida = "";
    userRef.where("revision", "==", "true")
    .get()
    .then(function(info){
        info.forEach(function(data){
            // console.log("Esta es la data que encontre en cuanto a la revision: ", data.data().revision)
            // salida += '<iframe src="'+data.data().url+'" width="100%" height="60px" frameborder="0"></iframe>'
            var url = data.data().url;
            var pdfName = decodeURIComponent(url.split('/').pop());
            if (pdfName.includes('?')) {
                pdfName = pdfName.split('?')[0];
            }
            salida += '<div class="card" style="width: 18rem; margin: 5px;">'
            salida += '<a href="'+url+'" target="_blank">'
            salida += ' <img src="images/pdf.jpg" class="card-img-top" alt="PDF">'
            salida += '</a>'
            salida += ' <div class="card-body">'

            salida += '     <h5 class="card-title">'+pdfName+'</h5>'
            salida += '     <p>Categoria: ' +data.data().categoria+ '</p>';

            salida += '     <a href="#" class="btn btn-primary">Ver màs...</a>'
            salida += ' </div>'
            salida += '</div>'

        })
        componentArchivos.innerHTML = salida;
    })
}