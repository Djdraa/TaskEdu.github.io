// Obtener el enlace de 'Inicio' y el ícono de la app
const inicioLink = document.getElementById('inicio-link');
const appIcon = document.getElementById('app-icon');

// Función para redirigir a la página principal
function redirigirInicio() {
  window.location.href = 'index.html'; // Cambia la URL de acuerdo a la página principal de tu sitio
}

// Asignar la función de redirección al hacer clic en el enlace "Inicio"
inicioLink.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que se recargue la página
  redirigirInicio();
});

// Asignar la función de redirección al hacer clic en el ícono de la app
appIcon.addEventListener('click', function() {
  redirigirInicio();
});
