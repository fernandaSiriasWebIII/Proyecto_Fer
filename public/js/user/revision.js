var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

var correoField = document.getElementById("correo");
var content = document.getElementById("showContent")
var txtContra = document.getElementById("contra")
var ingre = document.getElementById("Ingresar")
window.onload = () => {
	var auth = firebase.apps[0].auth();
	var salida ="";
	auth.onAuthStateChanged((user)=>{
		if (user) {
            correoField.value = user.email;
        } else {
            document.location.href = 'login.html';
        }
	})
}


ingre.addEventListener("click", (login) => {
	auth.signInWithEmailAndPassword(correoField.value, txtContra.value)
	.then((userCredential)=>{
		const dt = new Date();
		const user = userCredential.user;
		db.collection("datosUsuarios").where('idemp', '==', user.uid).get().then((userr)=>{
			userr.forEach(function (doc) {
                        doc.ref.update({ ultAcceso: dt }).then(function () {
                           	var userRef = firebase.firestore().collection("pdfsInformacion");
    						var salida = "";
    						userRef.where("revision", "==", "false")
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

            						salida += '     <a href="#" onclick="aceptar(event)" data-value="'+data.id+'" class="btn btn-primary">Aceptar</a>'
            						salida += '     <a href="#" onclick="denegar(event)" id="botonDenegar" data-value="'+data.id+'" class="btn btn-danger">Denegar</a>'
            						salida += ' </div>'
            						salida += '</div>'

        						})
        						content.innerHTML = salida;
    						})
                        });
                    });
		})
	})
})


function aceptar(event){
	var valor = event.target.getAttribute("data-value")
	var pdfReference = firebase.firestore().collection("pdfsInformacion");
	var pdfID = valor;

	pdfReference.doc(pdfID).update({
		revision: "true"
	})
	.then(function() {
		alert("El proyecto a sido aceptado. Ya puede visualizarlo los demás participantes.");
		window.location.href = "revision.html"
	})
	.catch(function(error) {
		alert("Error al actualizar el estado: ", error);
	});
}

function denegar(event){
	var valor = event.target.getAttribute("data-value")
	var pdfReference = firebase.firestore().collection("pdfsInformacion");
	var pdfID = valor;

	pdfReference.doc(pdfID).update({
		revision: "falses"
	})
	.then(function() {
		alert("El proyecto a sido denegado.");
		window.location.href = "revision.html"
	})
	.catch(function(error) {
		alert("Error al actualizar el estado: ", error);
	});
}