class Footer extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`<br><hr>
<div class="div_pi">
    <strong>Dirección: </strong>Ave. Alfonso Reyes 400 L-26, Col.<br/>Misión del Valle San Pedro Garza García, N.L., México<br/>
    <strong>E-Mail:    </strong> <a href="mailto:hola@pequenosciudadanos.org.mx?subject=Solicito información">hola@pequenosciudadanos.org.mx</a><br />
    <strong>Teléfono: </strong>+52 81 2064 0361
</div>
<div class="div_pc">
¡Regístrate gratis en nuestra plataforma y accede a nuestros cursos!<br/>
2024 © Formando Emprendedores, A.B.P.<br/>
Aviso de Privacidad
</div>
<div class="div_pd">
    <a href="https://www.facebook.com/pequenosciudadanos"><i class="fa fa-2x fa-facebook"></i></a>
    <br>
    <a href="https://twitter.com/"><i class="fa fa-2x fa-twitter"></i></a>
</div>` 
    }     
}

customElements.define('footer-component', Footer);