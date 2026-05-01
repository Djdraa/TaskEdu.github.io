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

/* ================= MODAL ================= */
function openModal() {
  document.getElementById('modal')?.classList.add('active');
}

function closeModal() {
  document.getElementById('modal')?.classList.remove('active');
}

/* ================= CREAR TAREA ================= */
async function saveTask() {
  const t = document.getElementById('title').value.trim();
  const d = document.getElementById('desc').value.trim();
  const p = document.getElementById('pri').value;
  const f = document.getElementById('date').value;

  if (!t || !d || !f) {
    alert("Completa los campos");
    return;
  }

  await fetch(`${API_URL}/tarea`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_usuario: usuario.id_usuario,
      titulo: t,
      descripcion: d,
      prioridad: p,
      fecha_entrega: f
    })
  });

  closeModal();
  renderTasks();
}

/* ================= LISTAR TAREAS ================= */
async function renderTasks() {
  const container = document.getElementById('taskGrid');

  container.innerHTML = "";

  const res = await fetch(`${API_URL}/tareas/${usuario.id_usuario}`);
  const tareas = await res.json();

  tareas.forEach(task => {
    container.innerHTML += `
      <div class="task-card">
        <h3>${task.titulo}</h3>
        <p>${task.descripcion}</p>
        <p>${task.prioridad}</p>
        <p>${task.fecha_entrega}</p>

        <input placeholder="Comentario..." id="c-${task.id_tarea}">
        <button onclick="addComment(${task.id_tarea})">Comentar</button>

        <button onclick="deleteTask(${task.id_tarea})">Eliminar</button>
      </div>
    `;
  });
}

/* ================= COMENTARIO ================= */
async function addComment(id) {
  const input = document.getElementById(`c-${id}`);
  const texto = input.value.trim();

  if (!texto) return;

  await fetch(`${API_URL}/comentario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_tarea: id,
      contenido: texto
    })
  });

  input.value = "";
}

/* ================= ELIMINAR ================= */
async function deleteTask(id) {
  await fetch(`${API_URL}/tarea/${id}`, {
    method: "DELETE"
  });

  renderTasks();
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});