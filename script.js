const API_URL = "https://taskedu-backend.onrender.com";

/* ================= MODAL (index.html) ================= */
function mostrarLogin() {
    const overlay = document.getElementById("modalOverlay");
    const frame   = document.getElementById("modalFrame");
    if (overlay && frame) {
        frame.src = "login.html";
        overlay.classList.add("active");
    }
}

function mostrarRegistro() {
    const overlay = document.getElementById("modalOverlay");
    const frame   = document.getElementById("modalFrame");
    if (overlay && frame) {
        frame.src = "registro.html";
        overlay.classList.add("active");
    }
}

function cerrarModal() {
    const overlay = document.getElementById("modalOverlay");
    if (overlay) {
        overlay.classList.remove("active");
        document.getElementById("modalFrame").src = "";
    }
}

/* ================= FORMS ================= */
document.addEventListener("DOMContentLoaded", () => {

    /* LOGIN */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const correo     = document.getElementById("email")?.value.trim();
            const contrasena = document.getElementById("password")?.value.trim();
            const btn        = loginForm.querySelector("button[type='submit']");

            if (!correo || !contrasena) {
                alert("Completa todos los campos");
                return;
            }

            btn.disabled    = true;
            btn.textContent = "Cargando...";

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

                localStorage.setItem("usuarioActivo", JSON.stringify(data.usuario));
                window.location.href = "dashboard.html";

            } catch (error) {
                console.error(error);
                alert("Error de conexión. El servidor puede estar iniciando, intenta en 30 segundos.");
            } finally {
                btn.disabled    = false;
                btn.textContent = "Entrar";
            }
        });
    }

    /* REGISTER */
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nombre          = document.getElementById("nombre")?.value.trim();
            const apellido        = document.getElementById("apellido")?.value.trim();
            const documento       = document.getElementById("documento")?.value.trim();
            const fechaNacimiento = document.getElementById("fechaNacimiento")?.value;
            const correo          = document.getElementById("correo")?.value.trim();
            const contrasena      = document.getElementById("contrasena")?.value.trim();
            const btn             = registerForm.querySelector("button[type='submit']");

            if (!nombre || !apellido || !documento || !fechaNacimiento || !correo || !contrasena) {
                alert("Completa todos los campos");
                return;
            }

            if (contrasena.length < 8) {
                alert("La contraseña debe tener mínimo 8 caracteres");
                return;
            }

            btn.disabled    = true;
            btn.textContent = "Registrando...";

            try {
                const res = await fetch(`${API_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre, apellido, documento, fechaNacimiento, correo, contrasena })
                });

                const data = await res.json();

                if (!res.ok) {
                    alert(data.error || "Error en registro");
                    return;
                }

                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                window.location.href = "login.html";

            } catch (error) {
                console.error(error);
                alert("Error de conexión. El servidor puede estar iniciando, intenta en 30 segundos.");
            } finally {
                btn.disabled    = false;
                btn.textContent = "Finalizar Registro";
            }
        });
    }

});
