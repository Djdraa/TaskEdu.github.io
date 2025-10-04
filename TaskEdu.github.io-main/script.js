/**
 * script.js
 * Funcionalidad de Modo Oscuro (Dark Mode) para TaskEdu
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el botón de toggle y el <body>
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    // Clave para guardar la preferencia en localStorage
    const storageKey = 'taskedu-dark-mode';

    // 2. Función para aplicar el modo
    const applyMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            modeToggle.textContent = '☀️'; // Icono para cambiar a modo claro
            localStorage.setItem(storageKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            modeToggle.textContent = '🌙'; // Icono para cambiar a modo oscuro
            localStorage.setItem(storageKey, 'light');
        }
    };

    // 3. Cargar la preferencia del usuario al iniciar
    const savedMode = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'dark' || (!savedMode && prefersDark)) {
        applyMode(true);
    } else {
        applyMode(false);
    }

    // 4. Añadir el evento al botón de toggle
    modeToggle.addEventListener('click', () => {
        // Toggle (cambiar) el modo actual
        const isCurrentlyDark = body.classList.contains('dark-mode');
        applyMode(!isCurrentlyDark);
    });
});