const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tarea", async (req, res) => {
  const { id_usuario, titulo, descripcion, prioridad, fecha_entrega } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tareas (id_usuario, titulo, descripcion, prioridad, fecha_entrega) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_usuario, titulo, descripcion, prioridad, fecha_entrega]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando tarea:", error);
    res.status(500).json({ error: "Error creando tarea" });
  }
});

app.get("/tareas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM tareas WHERE id_usuario = $1 ORDER BY id_tarea DESC",
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    res.status(500).json([]);
  }
});

app.delete("/tarea/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM tareas WHERE id_tarea = $1",
      [id]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando tarea:", error);
    res.status(500).json({ error: "Error eliminando tarea" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});