const API_URL = "https://taskedu-backend.onrender.com";

/* ================= UI ================= */

function showSection(id, e) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));

  const section = document.getElementById(id);
  if (section) section.classList.add('active');

  if (e) {
    e.currentTarget.classList.add('active');
    const title = document.getElementById('view-title');
    if (title) title.innerText = e.currentTarget.innerText;
  }
}

function toggleNoti() {
  const p = document.getElementById('notiPanel');
  if (!p) return;
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

function openModal(idx = -1) {
  const m = document.getElementById('modal');
  if (!m) return;

  m.classList.add('active');

  const title = document.getElementById('mTitle');
  const editIdx = document.getElementById('editIdx');
  const inputTitle = document.getElementById('title');
  const inputDesc = document.getElementById('desc');
  const inputPri = document.getElementById('pri');
  const inputDate = document.getElementById('date');

  if (idx > -1) {
    const tareas = window._tareasCache || [];
    const t = tareas[idx];

    if (title) title.innerText = "Editar Tarea";
    if (editIdx) editIdx.value = idx;

    if (inputTitle) inputTitle.value = t.titulo || "";
    if (inputDesc) inputDesc.value = t.descripcion || "";
    if (inputPri) inputPri.value = t.prioridad || "Alta";
    if (inputDate) inputDate.value = t.fecha_entrega || "";
  } else {
    if (title) title.innerText = "Nueva Tarea";
    if (editIdx) editIdx.value = -1;

    if (inputTitle) inputTitle.value = "";
    if (inputDesc) inputDesc.value = "";
    if (inputPri) inputPri.value = "Alta";
    if (inputDate) inputDate.value = "";
  }
}

function closeModal() {
  const m = document.getElementById('modal');
  if (m) m.classList.remove('active');
}

/* ================= TAREAS API ================= */

async function saveTask() {
  const t = document.getElementById('title')?.value.trim();
  const d = document.getElementById('desc')?.value.trim();
  const p = document.getElementById('pri')?.value;
  const f = document.getElementById('date')?.value;

  if (!t || !f) {
    alert("Completa los datos");
    return;
  }

  try {
    await fetch(`${API_URL}/tarea`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: 1,
        titulo: t,
        descripcion: d,
        prioridad: p,
        fecha_entrega: f
      })
    });

    closeModal();
    renderTasks();

  } catch (err) {
    console.error("Error guardando tarea:", err);
  }
}

async function renderTasks(filtro = 'todas') {
  const container = document.getElementById('taskGrid');
  const nList = document.getElementById('notiList');
  const badge = document.getElementById('badge');

  if (!container || !nList || !badge) return;

  container.innerHTML = "";
  nList.innerHTML = "";

  try {
    const res = await fetch(`${API_URL}/tareas/1`);
    const tareas = await res.json();

    window._tareasCache = tareas;

    let count = 0;

    tareas.forEach((task, i) => {

      let dotColor =
        task.prioridad === 'Alta' ? '#ef4444' :
        task.prioridad === 'Media' ? '#f59e0b' :
        '#10b981';

      nList.innerHTML += `
        <div class="noti-item">
          <div class="status-dot" style="background:${dotColor}"></div>
          <div>
            <strong>${task.titulo}</strong><br>
            <small>Prioridad ${task.prioridad}</small>
          </div>
        </div>
      `;

      if (filtro !== 'todas' && task.prioridad !== filtro) return;

      count++;

      container.innerHTML += `
        <div class="task-card">
          <div class="task-header">
            <span class="priority-badge ${task.prioridad}">
              ${task.prioridad}
            </span>
            <span style="cursor:pointer" onclick="openModal(${i})">⋯</span>
          </div>

          <h3>${task.titulo}</h3>
          <p>${task.descripcion}</p>

          <div class="task-footer">
            📅 Vence: ${task.fecha_entrega}
          </div>

          <button onclick="deleteTask(${task.id_tarea})"
            style="margin-top:10px; color:red; background:none; border:none; cursor:pointer">
            Eliminar
          </button>
        </div>
      `;
    });

    badge.innerText = count;

  } catch (err) {
    console.error("Error cargando tareas:", err);
  }
}

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/tarea/${id}`, {
      method: "DELETE"
    });

    renderTasks();

  } catch (err) {
    console.error("Error eliminando tarea:", err);
  }
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
