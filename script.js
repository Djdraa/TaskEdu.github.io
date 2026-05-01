const API_URL = "https://taskedu-backend.onrender.com";

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

    if (!overlay || !frame) return;

    frame.src = url;
    overlay.classList.add("active");
}

function cerrarModal() {
    const overlay = document.getElementById("modalOverlay");
    const frame = document.getElementById("modalFrame");

    if (!overlay || !frame) return;

    overlay.classList.remove("active");
    frame.src = "";
}

/* ================= LOGIN REAL ================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const correo = document.getElementById("email")?.value;
            const contrasena = document.getElementById("password")?.value;

            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correo, contrasena })
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));

                    window.location.href = "dashboard.html";
                } else {
                    alert(data.error || "Error en login");
                }

            } catch (err) {
                console.error(err);
                alert("Error de conexión");
            }
        });
    }

});
