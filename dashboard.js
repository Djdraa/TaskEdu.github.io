const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const API_URL = "https://taskedu-backend.onrender.com";

/* ================= PROTECCIÓN ================= */
if (!usuario) {
  window.location.href = "login.html";
}

/* ================= SECCIONES ================= */
function showSection(id, e) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));

  document.getElementById(id)?.classList.add('active');

  if (e) {
    e.currentTarget.classList.add('active');
    document.getElementById('view-title').innerText = e.currentTarget.innerText;
  }
}

/* ================= NOTIFICACIONES ================= */
function toggleNoti() {
  document.getElementById('notiPanel')?.classList.toggle('active');
}

/* ================= MODAL ================= */
function openModal() {
  document.getElementById('modal')?.classList.add('active');
}

function closeModal() {
  document.getElementById('modal')?.classList.remove('active');
}

/* ================= CREAR TAREA ================= */
async function saveTask() {
  const t   = document.getElementById('title').value.trim();
  const d   = document.getElementById('desc').value.trim();
  const p   = document.getElementById('pri').value;
  const f   = document.getElementById('date').value;
  const btn = document.querySelector('#modal .modal-box button:last-child');

  if (!t || !d || !f) {
    alert("Completa los campos");
    return;
  }

  btn.disabled    = true;
  btn.textContent = "Guardando...";

  try {
    const res = await fetch(`${API_URL}/tarea`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario:    usuario.id_usuario,
        titulo:        t,
        descripcion:   d,
        prioridad:     p,
        fecha_entrega: f
      })
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Error al crear tarea");
      return;
    }

    closeModal();
    document.getElementById('title').value = "";
    document.getElementById('desc').value  = "";
    document.getElementById('date').value  = "";
    renderTasks();

  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  } finally {
    btn.disabled    = false;
    btn.textContent = "Guardar";
  }
}

/* ================= LISTAR TAREAS ================= */
let todasLasTareas = [];

async function renderTasks(filtro = "todas") {
  const container = document.getElementById('taskGrid');

  if (!todasLasTareas.length) {
    container.innerHTML = "<p>Cargando...</p>";

    try {
      const res = await fetch(`${API_URL}/tareas/${usuario.id_usuario}`);
      if (!res.ok) throw new Error("Error al obtener tareas");
      todasLasTareas = await res.json();
    } catch (error) {
      console.error(error);
      container.innerHTML = "<p>Error al cargar tareas. Intenta de nuevo.</p>";
      return;
    }
  }

  const tareas = filtro === "todas"
    ? todasLasTareas
    : todasLasTareas.filter(t => t.prioridad === filtro);

  container.innerHTML = "";

  if (tareas.length === 0) {
    container.innerHTML = "<p>No hay tareas para mostrar.</p>";
    return;
  }

  tareas.forEach(task => {
    const fecha = task.fecha_entrega
      ? new Date(task.fecha_entrega).toLocaleDateString("es-CO")
      : "Sin fecha";

    container.innerHTML += `
      <div class="task-card">
        <h3>${task.titulo}</h3>
        <p>${task.descripcion}</p>
        <span class="badge badge-${task.prioridad?.toLowerCase()}">${task.prioridad}</span>
        <p class="task-date">📅 ${fecha}</p>

        <div class="task-actions">
          <input placeholder="Comentario..." id="c-${task.id_tarea}">
          <button onclick="addComment(${task.id_tarea})">Comentar</button>
          <button class="btn-delete" onclick="deleteTask(${task.id_tarea})">Eliminar</button>
        </div>
      </div>
    `;
  });
}

/* ================= COMENTARIO ================= */
async function addComment(id) {
  const input = document.getElementById(`c-${id}`);
  const texto = input.value.trim();

  if (!texto) return;

  try {
    await fetch(`${API_URL}/comentario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_tarea: id, contenido: texto })
    });

    input.value = "";
  } catch (error) {
    console.error(error);
    alert("Error al guardar comentario");
  }
}

/* ================= ELIMINAR ================= */
async function deleteTask(id) {
  if (!confirm("¿Eliminar esta tarea?")) return;

  try {
    await fetch(`${API_URL}/tarea/${id}`, { method: "DELETE" });
    todasLasTareas = todasLasTareas.filter(t => t.id_tarea !== id);
    renderTasks();
  } catch (error) {
    console.error(error);
    alert("Error al eliminar tarea");
  }
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
