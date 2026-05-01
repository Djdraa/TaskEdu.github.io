require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const bcrypt  = require("bcrypt");
const pool    = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { nombre, apellido, documento, fechaNacimiento, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const existe = await pool.query(
      "SELECT id_usuario FROM usuario WHERE correo = $1",
      [correo]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      `INSERT INTO usuario
      (nombre, correo, contrasena, fecha_creacion, activo)
      VALUES ($1, $2, $3, NOW(), true)
      RETURNING id_usuario, nombre, correo`,
      [nombre, correo, hash]
    );

    res.json({ mensaje: "Usuario creado", usuario: result.rows[0] });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ error: "Error en registro" });
  }
});


/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    const usuario = result.rows[0];
    const match   = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre:     usuario.nombre,
        correo:     usuario.correo
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
});


/* ================= TAREAS ================= */
app.post("/tarea", async (req, res) => {
  const { id_usuario, titulo, descripcion, prioridad, fecha_entrega } = req.body;

  if (!id_usuario || !titulo || !fecha_entrega) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tarea (id_usuario, titulo, descripcion, prioridad, fecha_entrega, fecha_creacion, completada)
       VALUES ($1, $2, $3, $4, $5, NOW(), false)
       RETURNING *`,
      [id_usuario, titulo, descripcion, prioridad, fecha_entrega]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
});

app.get("/tareas/:id_usuario", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tarea WHERE id_usuario = $1 ORDER BY fecha_entrega ASC",
      [req.params.id_usuario]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error al listar tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.delete("/tarea/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM comentario WHERE id_tarea = $1", [req.params.id]);
    await pool.query("DELETE FROM tarea WHERE id_tarea = $1",      [req.params.id]);

    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});


/* ================= COMENTARIOS ================= */
app.post("/comentario", async (req, res) => {
  const { id_tarea, contenido } = req.body;

  if (!id_tarea || !contenido) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comentario (id_tarea, contenido, fecha)
       VALUES ($1, $2, NOW())
       RETURNING *`,
      [id_tarea, contenido]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al guardar comentario:", error);
    res.status(500).json({ error: "Error al guardar comentario" });
  }
});


/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
