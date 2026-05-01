const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const API_URL = "https://taskedu-backend.onrender.com";

if (!usuario) window.top.location.href = "login.html";

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("sidebarUser")) {
        document.getElementById("sidebarUser").textContent = "👤 " + (usuario?.nombre || "");
    }
    const nota = localStorage.getItem("notaRapida");
    if (nota && document.getElementById("notasRapidas")) {
        document.getElementById("notasRapidas").value = nota;
    }
    const cfg = document.getElementById("cfg-nombre");
    if (cfg) cfg.value = usuario?.nombre || "";
    const cfgC = document.getElementById("cfg-correo");
    if (cfgC) cfgC.value = usuario?.correo || "";
    renderTasks();
    renderCalendario();
    renderHistorial();
});

/* ===== SESIÓN ===== */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.top.location.href = "index.html";
}

/* ===== SECCIONES ===== */
function showSection(id, e) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
    if (e) {
        e.currentTarget.classList.add('active');
        document.getElementById('view-title').innerText = e.currentTarget.innerText;
    }
    if (id === 'mis-tareas') renderMisTareas();
    if (id === 'calendario') renderCalendario();
    if (id === 'historial') renderHistorial();
}

/* ===== NOTIFICACIONES ===== */
function toggleNoti() {
    document.getElementById('notiPanel')?.classList.toggle('active');
}

/* ===== MODAL ===== */
function openModal() { document.getElementById('modal')?.classList.add('active'); }
function closeModal() { document.getElementById('modal')?.classList.remove('active'); }

/* ===== TAREAS ===== */
let todasLasTareas = [];

async function fetchTareas() {
    const res = await fetch(`${API_URL}/tareas/${usuario.id_usuario}`);
    if (!res.ok) throw new Error("Error al obtener tareas");
    todasLasTareas = await res.json();
    actualizarWidgets();
    actualizarNotificaciones();
}

function actualizarWidgets() {
    const completadas = todasLasTareas.filter(t => t.completada).length;
    const pendientes  = todasLasTareas.filter(t => !t.completada).length;
    const alta        = todasLasTareas.filter(t => t.prioridad === 'Alta' && !t.completada).length;
    document.getElementById('w-total').textContent       = todasLasTareas.length;
    document.getElementById('w-completadas').textContent = completadas;
    document.getElementById('w-pendientes').textContent  = pendientes;
    document.getElementById('w-alta').textContent        = alta;
    renderDonut(completadas, pendientes);
    renderUrgentes();
}

function actualizarNotificaciones() {
    const hoy     = new Date();
    const en3dias = new Date(); en3dias.setDate(hoy.getDate() + 3);
    const proximas = todasLasTareas.filter(t => {
        if (t.completada) return false;
        const f = new Date(t.fecha_entrega);
        return f >= hoy && f <= en3dias;
    });
    const badge = document.getElementById('badge');
    const list  = document.getElementById('notiList');
    if (badge) badge.textContent = proximas.length;
    if (list) {
        list.innerHTML = proximas.length === 0
            ? '<p style="padding:12px;color:#aaa;font-size:13px">Sin notificaciones</p>'
            : proximas.map(t => `
                <div class="noti-item">
                    <strong>${t.titulo}</strong>
                    <span>Vence: ${new Date(t.fecha_entrega).toLocaleDateString('es-CO')}</span>
                </div>`).join('');
    }
}

let donutInstance = null;
function renderDonut(completadas, pendientes) {
    const ctx = document.getElementById('donutChart');
    if (!ctx) return;
    if (donutInstance) donutInstance.destroy();
    const total = completadas + pendientes || 1;
    const pct   = Math.round((completadas / total) * 100);
    donutInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [completadas, pendientes],
                backgroundColor: ['#10B981', '#374151'],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '75%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });
    const lbl = document.getElementById('donut-label');
    if (lbl) lbl.textContent = `${pct}% completado`;
}

function renderUrgentes() {
    const hoy     = new Date();
    const en3dias = new Date(); en3dias.setDate(hoy.getDate() + 3);
    const urgentes = todasLasTareas.filter(t => {
        if (t.completada) return false;
        const f = new Date(t.fecha_entrega);
        return f <= en3dias;
    }).slice(0, 4);
    const el = document.getElementById('urgentes-list');
    if (!el) return;
    el.innerHTML = urgentes.length === 0
        ? '<p style="font-size:13px;color:#aaa">Sin tareas urgentes</p>'
        : urgentes.map(t => `
            <div class="urgente-item pri-${t.prioridad?.toLowerCase()}">
                <span>${t.titulo}</span>
                <small>${new Date(t.fecha_entrega).toLocaleDateString('es-CO')}</small>
            </div>`).join('');
}

async function renderTasks(filtro = "todas") {
    const container = document.getElementById('taskGrid');
    if (!container) return;
    if (!todasLasTareas.length) {
        container.innerHTML = '<p class="empty-msg">Cargando...</p>';
        try { await fetchTareas(); } catch {
            container.innerHTML = '<p class="empty-msg">Error al cargar tareas.</p>';
            return;
        }
    }
    const lista = filtro === "todas" ? todasLasTareas : todasLasTareas.filter(t => t.prioridad === filtro);
    container.innerHTML = lista.length === 0
        ? '<p class="empty-msg">No hay tareas para mostrar.</p>'
        : lista.map(t => tarjetaHTML(t)).join('');
}

async function renderMisTareas(estado = "todas") {
    const container = document.getElementById('misTareasGrid');
    if (!container) return;
    if (!todasLasTareas.length) {
        try { await fetchTareas(); } catch { return; }
    }
    const lista = estado === "todas" ? todasLasTareas
        : todasLasTareas.filter(t => estado === 'completada' ? t.completada : !t.completada);
    container.innerHTML = lista.length === 0
        ? '<p class="empty-msg">No hay tareas.</p>'
        : lista.map(t => tarjetaHTML(t)).join('');
}

function filtrarPorEstado(estado, btn) {
    document.querySelectorAll('#mis-tareas .tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMisTareas(estado);
}

function tarjetaHTML(task) {
    const fecha = task.fecha_entrega
        ? new Date(task.fecha_entrega).toLocaleDateString("es-CO") : "Sin fecha";
    const pri   = (task.prioridad || 'baja').toLowerCase();
    const check = task.completada ? 'checked' : '';
    return `
    <div class="task-card pri-border-${pri}" id="card-${task.id_tarea}">
        <div class="task-card-header">
            <label class="task-check">
                <input type="checkbox" ${check} onchange="toggleCompletar(${task.id_tarea}, this.checked)">
                <span class="task-title ${task.completada ? 'tachado' : ''}">${task.titulo}</span>
            </label>
            <span class="badge-pri badge-${pri}">${task.prioridad}</span>
        </div>
        <p class="task-desc">${task.descripcion || ''}</p>
        <div class="task-meta">
            <span class="task-date">📅 ${fecha}</span>
        </div>
        <div class="task-comments" id="comments-${task.id_tarea}"></div>
        <div class="task-actions">
            <input class="comment-input" placeholder="Escribe un comentario..." id="c-${task.id_tarea}">
            <button class="btn-comment" onclick="addComment(${task.id_tarea})">Comentar</button>
            <button class="btn-delete" onclick="deleteTask(${task.id_tarea})">Eliminar</button>
        </div>
    </div>`;
}

async function toggleCompletar(id, completada) {
    try {
        await fetch(`${API_URL}/tarea/${id}/completar`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completada })
        });
        const t = todasLasTareas.find(t => t.id_tarea === id);
        if (t) t.completada = completada;
        actualizarWidgets();
        const title = document.querySelector(`#card-${id} .task-title`);
        if (title) title.classList.toggle('tachado', completada);
    } catch { alert("Error al actualizar tarea"); }
}

async function saveTask() {
    const t   = document.getElementById('title').value.trim();
    const d   = document.getElementById('desc').value.trim();
    const p   = document.getElementById('pri').value;
    const f   = document.getElementById('date').value;
    const btn = document.querySelector('.btn-primary-modal');
    if (!t || !d || !f) { alert("Completa todos los campos"); return; }
    btn.disabled = true; btn.textContent = "Guardando...";
    try {
        const res = await fetch(`${API_URL}/tarea`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario: usuario.id_usuario, titulo: t, descripcion: d, prioridad: p, fecha_entrega: f })
        });
        if (!res.ok) { alert("Error al crear tarea"); return; }
        closeModal();
        document.getElementById('title').value = '';
        document.getElementById('desc').value  = '';
        document.getElementById('date').value  = '';
        todasLasTareas = [];
        await renderTasks();
    } catch { alert("Error de conexión"); }
    finally { btn.disabled = false; btn.textContent = "Guardar tarea"; }
}

async function addComment(id) {
    const input = document.getElementById(`c-${id}`);
    const texto = input?.value.trim();
    if (!texto) return;
    try {
        await fetch(`${API_URL}/comentario`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_tarea: id, contenido: texto })
        });
        const box = document.getElementById(`comments-${id}`);
        if (box) box.innerHTML += `<div class="comment-bubble">${texto}</div>`;
        input.value = "";
    } catch { alert("Error al guardar comentario"); }
}

async function deleteTask(id) {
    if (!confirm("¿Eliminar esta tarea?")) return;
    try {
        await fetch(`${API_URL}/tarea/${id}`, { method: "DELETE" });
        todasLasTareas = todasLasTareas.filter(t => t.id_tarea !== id);
        actualizarWidgets();
        document.getElementById(`card-${id}`)?.remove();
    } catch { alert("Error al eliminar"); }
}

/* ===== CALENDARIO ===== */
let calMes = new Date().getMonth();
let calAnio = new Date().getFullYear();

function cambiarMes(dir) {
    calMes += dir;
    if (calMes > 11) { calMes = 0; calAnio++; }
    if (calMes < 0)  { calMes = 11; calAnio--; }
    renderCalendario();
}

function renderCalendario() {
    const el  = document.getElementById('cal-grid');
    const tit = document.getElementById('cal-titulo');
    if (!el) return;
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    if (tit) tit.textContent = `${meses[calMes]} ${calAnio}`;
    const primero = new Date(calAnio, calMes, 1).getDay();
    const diasMes = new Date(calAnio, calMes + 1, 0).getDate();
    const hoy     = new Date();
    const tareasPorDia = {};
    todasLasTareas.forEach(t => {
        if (!t.fecha_entrega) return;
        const d = new Date(t.fecha_entrega).getDate();
        const m = new Date(t.fecha_entrega).getMonth();
        const a = new Date(t.fecha_entrega).getFullYear();
        if (m === calMes && a === calAnio) {
            if (!tareasPorDia[d]) tareasPorDia[d] = [];
            tareasPorDia[d].push(t);
        }
    });
    let html = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => `<div class="cal-day-name">${d}</div>`).join('');
    for (let i = 0; i < primero; i++) html += `<div class="cal-day empty"></div>`;
    for (let d = 1; d <= diasMes; d++) {
        const esHoy  = d === hoy.getDate() && calMes === hoy.getMonth() && calAnio === hoy.getFullYear();
        const tareas = tareasPorDia[d] || [];
        const puntos = tareas.map(t => `<span class="cal-dot pri-dot-${(t.prioridad||'baja').toLowerCase()}"></span>`).join('');
        html += `<div class="cal-day ${esHoy ? 'hoy' : ''}" title="${tareas.map(t => t.titulo).join(', ')}">
            <span>${d}</span>${puntos}</div>`;
    }
    el.innerHTML = html;
}

/* ===== HISTORIAL ===== */
function renderHistorial() {
    const el = document.getElementById('historial-list');
    if (!el) return;
    const acciones = todasLasTareas.slice(0, 10).map(t => ({
        texto: `Tarea creada: "${t.titulo}"`,
        fecha: t.fecha_creacion ? new Date(t.fecha_creacion).toLocaleString('es-CO') : ''
    }));
    el.innerHTML = acciones.length === 0
        ? '<p class="empty-msg">Sin actividad reciente.</p>'
        : acciones.map(a => `<div class="historial-item"><span>${a.texto}</span><small>${a.fecha}</small></div>`).join('');
}

/* ===== NOTAS RÁPIDAS ===== */
function guardarNota() {
    const nota = document.getElementById('notasRapidas')?.value;
    localStorage.setItem('notaRapida', nota || '');
    alert('Nota guardada');
}

/* ===== CONFIG ===== */
function guardarConfig() {
    const nombre = document.getElementById('cfg-nombre')?.value.trim();
    if (!nombre) { alert('Ingresa un nombre'); return; }
    const u = JSON.parse(localStorage.getItem('usuarioActivo'));
    u.nombre = nombre;
    localStorage.setItem('usuarioActivo', JSON.stringify(u));
    document.getElementById('sidebarUser').textContent = '👤 ' + nombre;
    alert('Perfil actualizado');
}

/* ===== POMODORO ===== */
let pomoTimer = null, pomoSegundos = 25 * 60, pomoTotal = 25 * 60, pomoCount = 0, pomoActivo = false;

function setModo(min, label, btn) {
    document.querySelectorAll('.pomo-modos .tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    resetPomodoro();
    pomoTotal = min * 60; pomoSegundos = min * 60;
    document.getElementById('pomo-label').textContent = label;
    actualizarDisplayPomo();
}

function iniciarPomodoro() {
    if (pomoActivo) return;
    pomoActivo = true;
    pomoTimer = setInterval(() => {
        pomoSegundos--;
        actualizarDisplayPomo();
        if (pomoSegundos <= 0) {
            clearInterval(pomoTimer);
            pomoActivo = false;
            pomoCount++;
            document.getElementById('pomo-count').textContent = pomoCount;
            alert('¡Pomodoro completado! 🍅');
        }
    }, 1000);
}

function pausarPomodoro() {
    clearInterval(pomoTimer);
    pomoActivo = false;
}

function resetPomodoro() {
    clearInterval(pomoTimer);
    pomoActivo = false;
    pomoSegundos = pomoTotal;
    actualizarDisplayPomo();
}

function actualizarDisplayPomo() {
    const m = Math.floor(pomoSegundos / 60).toString().padStart(2, '0');
    const s = (pomoSegundos % 60).toString().padStart(2, '0');
    document.getElementById('pomo-display').textContent = `${m}:${s}`;
    const arc = document.getElementById('pomo-arc');
    if (arc) {
        const pct = pomoSegundos / pomoTotal;
        arc.style.strokeDashoffset = 339.3 * (1 - pct);
    }
}
