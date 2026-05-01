function showSection(id, e) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));

    document.getElementById(id).classList.add('active');

    if (e) {
        e.currentTarget.classList.add('active');
        document.getElementById('view-title').innerText = e.currentTarget.innerText;
    }
}

function toggleNoti() {
    const p = document.getElementById('notiPanel');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
}

function openModal(idx = -1) {
    const m = document.getElementById('modal');
    m.classList.add('active');

    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    if (idx > -1) {
        const t = tareas[idx];

        document.getElementById('mTitle').innerText = "Editar Tarea";
        document.getElementById('editIdx').value = idx;
        document.getElementById('title').value = t.titulo;
        document.getElementById('desc').value = t.descripcion;
        document.getElementById('pri').value = t.prioridad;
        document.getElementById('date').value = t.fecha;
    } else {
        document.getElementById('mTitle').innerText = "Nueva Tarea";
        document.getElementById('editIdx').value = -1;
        document.getElementById('title').value = "";
        document.getElementById('desc').value = "";
        document.getElementById('date').value = "";
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function saveTask() {
    const t = document.getElementById('title').value.trim();
    const d = document.getElementById('desc').value.trim();
    const p = document.getElementById('pri').value;
    const f = document.getElementById('date').value;
    const idx = document.getElementById('editIdx').value;

    if (!t || !f) {
        alert("Completa los datos");
        return;
    }

    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    const data = {
        titulo: t,
        descripcion: d,
        prioridad: p,
        fecha: f
    };

    if (idx == -1) {
        tareas.push(data);
    } else {
        tareas[idx] = data;
    }

    localStorage.setItem('tareas', JSON.stringify(tareas));

    closeModal();
    renderTasks();
}

function renderTasks(filtro = 'todas') {
    const container = document.getElementById('taskGrid');
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const nList = document.getElementById('notiList');
    const badge = document.getElementById('badge');

    container.innerHTML = "";
    nList.innerHTML = "";

    let count = 0;

    tareas.forEach((task, i) => {
        count++;

        let dotColor =
            task.prioridad === 'Alta' ? '#ef4444' :
            task.prioridad === 'Media' ? '#f59e0b' :
            '#10b981';

        // NOTIFICACIONES
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

        // TARJETAS
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
                    📅 Vence: ${task.fecha}
                </div>

                <button onclick="deleteTask(${i})"
                    style="margin-top:10px; color:red; background:none; border:none; cursor:pointer">
                    Eliminar
                </button>
            </div>
        `;
    });

    badge.innerText = count;
}

function deleteTask(i) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    tareas.splice(i, 1);

    localStorage.setItem('tareas', JSON.stringify(tareas));

    renderTasks();
}

// INICIAR
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});