<<<<<<< HEAD
const API_URL = "https://taskedu-backend.onrender.com";

=======
/* ================= CONFIG ================= */

const API_URL = "https://taskedu-backend.onrender.com";


>>>>>>> 8b01e41 (actulización de script.js y otras cosas)
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

<<<<<<< HEAD
/* ================= LOGIN REAL ================= */

document.addEventListener("DOMContentLoaded", function () {
=======
document.addEventListener("click", function (e) {
    const overlay = document.getElementById("modalOverlay");
    if (overlay && e.target === overlay) cerrarModal();
});


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= LOGIN ================= */
>>>>>>> 8b01e41 (actulización de script.js y otras cosas)

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

<<<<<<< HEAD
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
=======
            const correo = document.getElementById("email")?.value.trim();
            const contrasena = document.getElementById("password")?.value.trim();

            if (!correo || !contrasena) {
                alert("Completa todos los campos");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ correo, contrasena })
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.error || "Error en login");
                    return;
                }

                // guardar usuario
                localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));

                // redirigir
                window.location.href = "dashboard.html";

            } catch (error) {
                console.error("ERROR LOGIN:", error);
                alert("No se pudo conectar con el servidor");
>>>>>>> 8b01e41 (actulización de script.js y otras cosas)
            }
        });
    }

<<<<<<< HEAD
});
=======

    /* ================= REGISTER ================= */

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre")?.value.trim();
            const correo = document.getElementById("correo")?.value.trim();
            const contrasena = document.getElementById("contrasena")?.value.trim();

            if (!nombre || !correo || !contrasena) {
                alert("Completa los campos obligatorios");
                return;
            }

            try {
                const res = await fetch(`${API_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        contrasena
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.error || "Error en registro");
                    return;
                }

                alert("Registro exitoso");

                window.location.href = "login.html";

            } catch (error) {
                console.error("ERROR REGISTER:", error);
                alert("No se pudo conectar con el servidor");
            }
        });
    }


    /* ================= AUTO LOGIN CHECK ================= */

    const usuario = localStorage.getItem("usuarioActivo");

    if (usuario && window.location.pathname.includes("login.html")) {
        window.location.href = "dashboard.html";
    }

});
>>>>>>> 8b01e41 (actulización de script.js y otras cosas)
