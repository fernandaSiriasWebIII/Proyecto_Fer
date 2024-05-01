class Menu extends HTMLElement{
    constructor(){
        super();
        this.innerHTML=`<nav class="navbar navbar-expand-lg navbar-primary bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="images/logo/education.png" alt="" width="65%"  class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Nosotros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="files.html">Español</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="crearPerfil.html">Crear Perfil</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="revision.html">Revision de Documentos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="listaParticipantes.html">Participantes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="signup.html">Registrarse</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="salir()">Cerrar Sesión</a>
                </li>
            </ul>
        </div>
    </div>
</nav>`
    }
}

customElements.define('menu-component', Menu);