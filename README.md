# TaskEdu - Sistema de Gestión Académica

## Descripción General

**TaskEdu** es una aplicación web completa para la gestión de tareas académicas. Permite a estudiantes registrarse, autenticarse, crear tareas, agregar comentarios y marcar tareas como completadas. El sistema está integrado con una base de datos PostgreSQL en la nube y un backend REST.

## 📋 Características Principales

✅ **Autenticación de Usuarios**
- Registro de nuevos usuarios con validación
- Login con contraseña encriptada (bcrypt)
- Sesión persistente con localStorage

✅ **Gestión de Tareas (CRUD)**
- Crear tareas con título, descripción, prioridad y fecha de entrega
- Listar tareas del usuario autenticado
- Eliminar tareas
- Marcar tareas como completadas

✅ **Sistema de Comentarios**
- Agregar comentarios a tareas
- Almacenamiento persistente en BD

✅ **Conexión a Base de Datos**
- PostgreSQL en la nube
- Tablas: usuarios, tareas, comentarios
- Variables de entorno para configuración

## 🛠 Stack Tecnológico

| Componente | Tecnología |
|---|---|
| **Backend** | Node.js + Express.js |
| **Frontend** | HTML5 + CSS3 + JavaScript puro |
| **Base de Datos** | PostgreSQL (Nube) |
| **Seguridad** | bcrypt para contraseñas |
| **Hosting Backend** | Render |
| **Hosting Frontend** | GitHub Pages |
| **Versionamiento** | Git + GitHub |

## 📦 Dependencias

```json
{
  "bcrypt": "^6.0.0",      // Encriptación de contraseñas
  "cors": "^2.8.6",        // Control de CORS
  "dotenv": "^17.4.2",     // Variables de entorno
  "express": "^5.2.1",     // Framework backend
  "pg": "^8.20.0"          // Cliente PostgreSQL
}
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js v14 o superior
- npm (incluido con Node.js)
- PostgreSQL (o acceso a instancia en la nube)
- Navegador moderno

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Djdraa/TaskEdu.github.io.git
cd TaskEdu.github.io
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/taskedu
PORT=3000
NODE_ENV=development
```

4. **Crear tablas en la base de datos**
Ejecutar en PostgreSQL:
```sql
-- Tabla de usuarios
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  documento VARCHAR(20),
  fecha_nacimiento DATE,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  activo BOOLEAN DEFAULT true
);

-- Tabla de tareas
CREATE TABLE tarea (
  id_tarea SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  prioridad VARCHAR(20) DEFAULT 'media',
  fecha_entrega DATE,
  completada BOOLEAN DEFAULT false,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Tabla de comentarios
CREATE TABLE comentario (
  id_comentario SERIAL PRIMARY KEY,
  id_tarea INTEGER NOT NULL REFERENCES tarea(id_tarea) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_usuario_correo ON usuario(correo);
CREATE INDEX idx_tarea_usuario ON tarea(id_usuario);
CREATE INDEX idx_comentario_tarea ON comentario(id_tarea);
```

5. **Iniciar el servidor**
```bash
npm start
# o
node server.js
```

El servidor estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Body |
|---|---|---|---|
| POST | `/register` | Registrar usuario | `{ nombre, correo, contrasena, ... }` |
| POST | `/login` | Iniciar sesión | `{ correo, contrasena }` |

### Tareas

| Método | Endpoint | Descripción | Parámetros |
|---|---|---|---|
| POST | `/tarea` | Crear tarea | `{ id_usuario, titulo, descripcion, prioridad, fecha_entrega }` |
| GET | `/tareas/:id_usuario` | Obtener tareas del usuario | `id_usuario` en URL |
| DELETE | `/tarea/:id` | Eliminar tarea | `id` en URL |
| PATCH | `/tarea/:id/completar` | Marcar como completada | `{ completada: true/false }` |

### Comentarios

| Método | Endpoint | Descripción | Body |
|---|---|---|---|
| POST | `/comentario` | Agregar comentario | `{ id_tarea, contenido }` |

### Health Check

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Estado del servidor |

## 📁 Estructura del Proyecto

```
TaskEdu.github.io/
├── server.js              # Servidor backend (API REST)
├── db.js                  # Conexión a PostgreSQL
├── package.json           # Dependencias
├── .env                   # Variables de entorno (NO commitear)
├── .env.example           # Ejemplo de variables
│
├── index.html             # Página principal
├── login.html             # Formulario de login
├── registro.html          # Formulario de registro
├── dashboard.html         # Panel de tareas
│
├── script.js              # Lógica de autenticación (frontend)
├── dashboard.js           # Lógica de gestión de tareas
├── notificacion.js        # Sistema de notificaciones
│
├── css/                   # Estilos CSS
├── img/                   # Imágenes y diagramas
├── node_modules/          # Dependencias instaladas
```

## 🧪 Pruebas de la API

### Con Postman

1. **Registrar usuario**
```
POST https://taskedu-backend.onrender.com/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "documento": "12345678",
  "fechaNacimiento": "2000-01-01",
  "correo": "juan@example.com",
  "contrasena": "password123"
}
```

2. **Login**
```
POST https://taskedu-backend.onrender.com/login
Content-Type: application/json

{
  "correo": "juan@example.com",
  "contrasena": "password123"
}
```

3. **Crear tarea**
```
POST https://taskedu-backend.onrender.com/tarea
Content-Type: application/json

{
  "id_usuario": 1,
  "titulo": "Estudiar para examen",
  "descripcion": "Revisar contenidos de software",
  "prioridad": "alta",
  "fecha_entrega": "2026-06-01"
}
```

## 🔐 Seguridad

- ✅ Contraseñas encriptadas con bcrypt (10 rounds)
- ✅ Validación de campos obligatorios
- ✅ CORS configurado para comunicación frontend-backend
- ✅ Variables de entorno para credenciales sensibles
- ✅ Conexión SSL a base de datos

## 🌐 Despliegue

### Backend (Render)

1. Crear cuenta en [Render.com](https://render.com)
2. Conectar repositorio GitHub
3. Crear servicio Web
4. Configurar variables de entorno:
   - `DATABASE_URL`: cadena de conexión PostgreSQL
   - `NODE_ENV`: production
5. Deploy automático en cada push

**URL del backend**: `https://taskedu-backend.onrender.com`

### Frontend (GitHub Pages)

El frontend se sirve automáticamente desde GitHub Pages en la raíz del repositorio.

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE WEB                           │
│  (HTML/CSS/JavaScript - index.html, dashboard.html)     │
└────────────────┬────────────────────────────────────────┘
                 │ HTTP/JSON
                 ↓
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Express)                       │
│  (server.js con 8 endpoints REST)                       │
│  - /register, /login, /tarea, /tareas, etc.            │
└────────────────┬────────────────────────────────────────┘
                 │ SQL
                 ↓
┌─────────────────────────────────────────────────────────┐
│           BASE DE DATOS (PostgreSQL)                    │
│  - Tabla: usuario                                       │
│  - Tabla: tarea                                         │
│  - Tabla: comentario                                    │
└─────────────────────────────────────────────────────────┘
```

## 📝 Historias de Usuario Implementadas

- **HU-001**: Iniciar sesión
- **HU-002**: Registro de usuario
- **HU-003**: Crear tareas
- **HU-004**: Consultar tareas
- **HU-005**: Eliminar tareas
- **HU-006**: Agregar comentarios
- **HU-007**: Marcar tareas como completadas

## ✅ Funcionalidades Implementadas

| Funcionalidad | Estado |
|---|---|
| Registro de usuarios | ✅ Completo |
| Autenticación (Login) | ✅ Completo |
| CRUD de tareas | ✅ Completo |
| Sistema de comentarios | ✅ Completo |
| Base de datos PostgreSQL | ✅ Completo |
| API REST documentada | ✅ Completo |
| Encriptación de contraseñas | ✅ Completo |
| CORS habilitado | ✅ Completo |
| Validación de campos | ✅ Completo |

## 📚 Documentación Adicional

- `Informe-de-software.md` - Informe técnico completo del proyecto
- `API-Informe.md` - Especificación detallada de endpoints
- `ftecnica.html` - Ficha técnica del proyecto
- `modelo.html` - Diagramas de base de datos

## 🐛 Resolución de Problemas

### Error: "ECONNREFUSED" en la BD
- Verificar que `DATABASE_URL` está correctamente configurado
- Comprobar que el servidor PostgreSQL está activo
- Validar credenciales en `.env`

### Error: "CORS error"
- El backend debe estar activo en `https://taskedu-backend.onrender.com`
- Verificar que el frontend se comunica con la URL correcta en `script.js`

### Error: "Tabla no existe"
- Ejecutar los comandos SQL proporcionados en la sección de instalación
- Verificar que está conectado a la BD correcta

## 📞 Contacto y Soporte

**Repositorio**: https://github.com/Djdraa/TaskEdu.github.io

**Autor**: Estudiante ADSO (Análisis y Desarrollo de Software)

**Instructor**: Mauro

## 📄 Licencia

ISC License

---

**Última actualización**: 26 de mayo de 2026

**Estado del proyecto**: ✅ Funcional con BD PostgreSQL conectada
