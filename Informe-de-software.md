# Informe de Software del Proyecto Formativo

## Portada

- Nombre del aprendiz: [Tu nombre completo]
- Documento de identidad: [Tu cédula]
- Nombre del proyecto: TaskEdu - Sistema de Gestión Académica
- Ficha: [Número de ficha o grupo]
- Instructor: [Nombre del instructor]
- Fecha: [Fecha de entrega]

## 1. Introducción

TaskEdu es una aplicación web que busca resolver la falta de organización en tareas académicas y la dificultad para llevar un control efectivo de actividades estudiantiles. El sistema facilita el registro de usuarios, inicio de sesión, gestión de tareas, comentarios y visualización del progreso del estudiante.

El alcance del sistema incluye el desarrollo de un backend con servicios web REST, un frontend interactivo y una base de datos en la nube, integrando módulos codificados, probados y conectados con un repositorio de datos.

## 2. Objetivos del informe

### Objetivo general

Describir de manera técnica los detalles del proyecto de software TaskEdu, incluyendo su arquitectura, módulos codificados, interacción entre cliente y servidor, y las pruebas realizadas para validar su funcionamiento.

### Objetivos específicos

- Documentar los requerimientos funcionales y no funcionales del sistema.
- Presentar la arquitectura utilizada y describir sus capas y componentes.
- Describir los módulos desarrollados y su función dentro del sistema.
- Presentar avances del proyecto y las pruebas realizadas.
- Registrar las tecnologías aplicadas en el desarrollo del software.

## 3. Descripción del problema y alcance

### Contexto del problema real

TaskEdu nace de la necesidad de mejorar la organización académica de los estudiantes, especialmente cuando las tareas, fechas de entrega y actividades se gestionan de forma dispersa. La experiencia formativa identificó que muchos usuarios requieren una herramienta centralizada que les permita llevar un control de sus trabajos y obtener un acceso rápido a sus tareas pendientes.

### Actores involucrados

- Estudiante/Usuario final: persona que crea cuentas, inicia sesión, registra tareas, agrega comentarios y marca tareas como completadas.
- Sistema web: conjunto de páginas y servicios que brinda la funcionalidad al usuario.
- API backend: servicio REST que procesa las solicitudes del frontend y accede a la base de datos.
- Base de datos remota: almacena usuarios, tareas y comentarios en PostgreSQL.
- Plataforma de despliegue: Render, que mantiene el backend disponible y con conexión a la nube.

### Necesidad que atiende

El proyecto atiende la necesidad de contar con un repositorio de datos confiable y una interfaz web que facilite la gestión de actividades académicas. Busca reducir el tiempo perdido en búsquedas, evitar la pérdida de información y permitir un seguimiento claro del estado de cada tarea. Además, responde a la necesidad de integrar un sistema funcional que vaya más allá de la parte gráfica, conectando la interfaz con el backend y un repositorio de datos en la nube.

### Alcance del sistema

El alcance del sistema define lo que hace y lo que no hace actualmente.

#### Lo que hace
- Permitir el registro de nuevos usuarios.
- Permitir el inicio de sesión de usuarios con credenciales.
- Crear tareas con título, descripción, prioridad y fecha de entrega.
- Consultar tareas asociadas a un usuario.
- Eliminar tareas existentes.
- Guardar comentarios en tareas.
- Marcar tareas como completadas.
- Verificar el estado del servidor con un endpoint de salud.

#### Lo que no hace (actualmente)
- No permite edición avanzada de tareas.
- No gestiona roles y permisos detallados por tipos de usuario.
- No envía correos electrónicos o notificaciones externas.
- No exporta datos a PDF o Excel.
- No es una aplicación móvil nativa; funciona como aplicación web.

### Qué se está cumpliendo

Aunque no todos los requisitos originales se implementan, el proyecto cumple con los requisitos básicos de registro, login, CRUD de tareas, comentarios y conexión con una base de datos remota. Estos componentes son la base funcional que demuestra la codificación y pruebas de los módulos de software requeridos.

## 4. Requerimientos del sistema

### 4.1 Requerimientos funcionales que cumple el sistema actualmente

- Registro de usuarios.
- Inicio de sesión de usuarios.
- Dashboard de tareas.
- Creación de tareas.
- Consulta de tareas por usuario.
- Eliminación de tareas.
- Almacenamiento de comentarios por tarea.
- Marcado de tareas como completadas.
- Filtros o clasificación de tareas por prioridad.
- Health check del servidor.

### 4.2 Requerimientos funcionales proyectados o futuros

- Edición avanzada de tareas.
- Gestión de roles y permisos avanzados.
- Notificaciones de tareas próximas a vencer.
- Adjuntar archivos a las tareas.
- Exportación de datos a PDF o Excel.
- Integración con correo electrónico.
- Versión móvil nativa.

### 4.3 Requerimientos no funcionales

- Usabilidad: interfaz sencilla y directa.
- Seguridad de datos: contraseñas encriptadas y validación de accesos.
- Rendimiento: respuestas de la API en tiempo razonable.
- Disponibilidad: hospedaje en Render para mantener el servicio activo.
- Portabilidad: sistema basado en JavaScript y Node.js.
- Compatibilidad: navegador web moderno.

### 4.4 Cómo se manejan los requerimientos en el informe

En este documento se presentan primero los requerimientos que el sistema ya cumple en su estado actual. En una segunda sección se identifican las mejoras y funcionalidades proyectadas, para mostrar qué partes del alcance ya están implementadas y qué elementos se dejarían como evolución futura.

## 5. Arquitectura del software

### Modelo arquitectónico

El sistema se basa en una arquitectura cliente-servidor con API REST.

- Capa de presentación: HTML + CSS + JavaScript.
- Capa de servicio: Node.js + Express.
- Capa de datos: PostgreSQL en la nube.

### Diagrama general del sistema

Los diagramas del modelo están disponibles en:

- `img/ER.jpeg` (Diagrama ER)
- `img/Log_relacional.png` (Diagrama relacional)
- `img/dominio1.png` y `img/dominio2.png` (diagramas de dominio)
- `img/actividad1.png` y `img/actividad3.png` (diagramas de actividades)

### Descripción de cada capa

- Frontend: carga la interfaz y hace llamadas `fetch` a la API.
- Backend: recibe peticiones HTTP, procesa la lógica de negocio y consulta la base de datos.
- Base de datos: almacena usuarios, tareas y comentarios.

## 6. Tecnologías utilizadas

- Lenguaje de backend: JavaScript con Node.js.
- Framework backend: Express.js.
- Frontend: HTML, CSS y JavaScript puro.
- Base de datos: PostgreSQL.
- Hosting / Deploy: Render.
- Monitoreo: UptimeRobot (mantiene el servidor activo).
- Versionamiento: Git y GitHub.
- Librerías: `bcrypt`, `cors`, `dotenv`, `pg`.

## 7. Diseño del software

### Artefactos del ciclo de vida

- Requerimientos funcionales y no funcionales: ver `ftecnica.html`.
- Prototipo de interfaz: la aplicación web cuenta con páginas de login, registro y dashboard.
- Modelo de datos: diagrama ER y relacional disponibles en `modelo.html`.

### Historias de usuario y criterios de aceptación

#### HU-001: Iniciar sesión
- Rol: Como usuario registrado
- Enunciado: Necesito poder iniciar sesión en la plataforma para acceder a mis tareas y datos personales.
- Criterio de aceptación: El usuario ingresa un correo y contraseña válidos y accede al dashboard.
- Contexto: El usuario se encuentra en la pantalla de inicio de sesión.
- Evento: El usuario completa el formulario y presiona el botón de iniciar sesión.
- Resultado esperado: Si las credenciales son correctas, el sistema redirige al dashboard; si no, muestra un mensaje de error.

#### HU-002: Registro de usuario
- Rol: Como usuario no registrado
- Enunciado: Necesito poder registrarme en la plataforma para acceder a sus funciones.
- Criterio de aceptación: El sistema crea un nuevo usuario cuando se envía el formulario con datos válidos.
- Contexto: El usuario se encuentra en la pantalla de registro.
- Evento: El usuario completa el formulario de registro y presiona el botón de registrarse.
- Resultado esperado: Si los datos son válidos, se crea la cuenta y el usuario puede iniciar sesión; si hay errores, se muestran mensajes de validación.

#### HU-003: Crear tareas
- Rol: Como usuario registrado
- Enunciado: Necesito poder crear tareas para organizar mis actividades académicas.
- Criterio de aceptación: El sistema almacena una nueva tarea cuando el usuario envía el formulario con título y fecha de entrega.
- Contexto: El usuario está en el dashboard y accede al formulario de nueva tarea.
- Evento: El usuario completa los campos de título, descripción, prioridad y fecha de entrega, y envía la tarea.
- Resultado esperado: La tarea se guarda en la base de datos y aparece en la lista de tareas.

#### HU-004: Consultar tareas
- Rol: Como usuario registrado
- Enunciado: Necesito ver mis tareas para saber qué actividades tengo pendientes.
- Criterio de aceptación: El dashboard muestra la lista de tareas asociadas al usuario.
- Contexto: El usuario está autenticado y visualiza su panel de tareas.
- Evento: El sistema solicita las tareas al backend usando el ID del usuario.
- Resultado esperado: Se muestra la lista de tareas ordenadas por fecha de entrega.

#### HU-005: Eliminar tareas
- Rol: Como usuario registrado
- Enunciado: Necesito eliminar tareas que ya no son necesarias.
- Criterio de aceptación: El sistema elimina la tarea seleccionada y no aparece más en la lista.
- Contexto: El usuario visualiza una tarea dentro del dashboard.
- Evento: El usuario presiona el botón de eliminar en una tarea.
- Resultado esperado: La tarea se borra de la base de datos y se actualiza la lista de tareas.

#### HU-006: Agregar comentarios a tareas
- Rol: Como usuario registrado
- Enunciado: Necesito dejar notas en mis tareas para recordar detalles importantes.
- Criterio de aceptación: El sistema guarda el comentario asociado a la tarea seleccionada.
- Contexto: El usuario está en la vista de gestión de tareas.
- Evento: El usuario ingresa el comentario y presiona el botón de enviar.
- Resultado esperado: El comentario se almacena y queda asociado a la tarea.

#### HU-007: Marcar tareas como completadas
- Rol: Como usuario registrado
- Enunciado: Necesito marcar mis tareas como completadas para llevar seguimiento de mi progreso.
- Criterio de aceptación: El sistema actualiza el estado de la tarea a completada.
- Contexto: El usuario revisa su listado de tareas.
- Evento: El usuario selecciona la opción de completar una tarea.
- Resultado esperado: La tarea cambia su estado a completada y se refleja en la interfaz.

## 8. Módulos desarrollados

### Módulo backend: API REST

- Archivo: `server.js`
- Funcionalidad: provee endpoints para registro, login, creación, consulta, eliminación de tareas, comentarios y cambio de estado.
- Entrada: JSON desde el cliente.
- Salida: JSON con resultados o mensajes de error.

### Módulo de datos: Conexión a BD

- Archivo: `db.js`
- Funcionalidad: conecta a PostgreSQL usando `DATABASE_URL` y SSL.

### Módulo frontend: autenticación y gestión de tareas

- Archivos: `script.js`, `dashboard.js`
- Funcionalidad: captura formularios de login y registro, almacena usuario en `localStorage`, muestra tareas y permite operaciones CRUD.

### Módulo de interfaz web

- Archivos HTML: `index.html`, `login.html`, `registro.html`, `dashboard.html`
- Descripción: páginas de acceso público e interfaz de gestión de tareas para el usuario.

## 9. Pruebas del sistema

### Pruebas realizadas

- Pruebas de la API con Postman en los endpoints:
  - `POST /register`
  - `POST /login`
  - `POST /tarea`
  - `GET /tareas/:id_usuario`
  - `DELETE /tarea/:id`
  - `POST /comentario`
  - `PATCH /tarea/:id/completar`
  - `GET /`

- Pruebas funcionales en la interfaz:
  - Registro de usuario.
  - Inicio de sesión.
  - Creación de tareas.
  - Visualización de tareas.
  - Eliminación de tareas.
  - Comentarios de tareas.
  - Marcado de tareas como completadas.

### Resultados

- El backend responde correctamente a solicitudes JSON.
- El frontend hace consumo de la API usando `fetch` hacia `https://taskedu-backend.onrender.com`.
- La base de datos remota almacena usuarios, tareas y comentarios.

### Correcciones aplicadas

- Se implementó validación de campos obligatorios en `server.js`.
- Se agregó encriptación de contraseña con `bcrypt`.
- Se maneja `CORS` para permitir comunicación frontend-backend.

## 10. Conclusiones

TaskEdu ya cuenta con módulos codificados y probados para el registro de usuarios, gestión de tareas y comentarios. La solución implementada cumple los requisitos funcionales básicos y demuestra integración con base de datos en la nube y hosting en Render.

El informe se puede complementar con evidencias gráficas y video de Postman para dejar constancia de las pruebas realizadas. Además, el documento debe ser enriquecido con capturas de pantalla de la aplicación y los diagramas UML disponibles.

## 11. Bibliografía

- Documentación oficial de Node.js.
- Documentación oficial de Express.
- Guía de PostgreSQL.
- Material formativo de ADSO.

## 12. Anexos

### Imágenes y capturas recomendadas

- Captura de `login.html`.
- Captura de `registro.html`.
- Captura de `dashboard.html` con tareas.
- Captura del resultado de Postman para cada endpoint.
- Diagrama ER (`img/ER.jpeg`).
- Diagrama relacional (`img/Log_relacional.png`).
- Diagramas de dominio y actividad (`img/dominio1.png`, `img/dominio2.png`, `img/actividad1.png`, `img/actividad3.png`).

### Enlace al repositorio

- GitHub: https://github.com/Djdraa/TaskEdu.github.io

### Notas de evidencia

- El informe técnico general puede usar este documento como base.
- La evidencia de frontend teórica (AA4-EV01) es separada y debe responder preguntas sobre componentes frontend y el framework que estés usando.
- Esta entrega se centra en la evidencia de software codificado y probado (AA2-EV02, AA3-EV02).
