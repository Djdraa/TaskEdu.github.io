/* ================= MODAL ================= */

function mostrarLogin() {
    abrirModal("login.html");
}

function mostrarRegistro() {
    abrirModal("registro.html");
}

function abrirModal(url) {
    const overlay = document.getElementById("modalOverlay");
    const frame = document.getElementById("modalFrame");

    frame.src = url;
    overlay.classList.add("active");
}

function cerrarModal() {
    const overlay = document.getElementById("modalOverlay");
    const frame = document.getElementById("modalFrame");

    overlay.classList.remove("active");
    frame.src = "";
}

/* Cerrar modal al hacer click fuera */

document.addEventListener("click", function (e) {
    const overlay = document.getElementById("modalOverlay");

    if (e.target === overlay) {
        cerrarModal();
    }
});


/* ================= LOGIN ================= */
document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");

    if(loginForm){
        loginForm.addEventListener("submit", function(e){
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if(email && password){
                localStorage.setItem("usuarioActivo", "true");
                
                // CRÍTICO: Romper el frame si existe para abrir en pantalla completa
                if (window.top !== window.self) {
                    window.top.location.href = "dashboard.html";
                } else {
                    window.location.href = "dashboard.html";
                }
            }
        });
    }
});