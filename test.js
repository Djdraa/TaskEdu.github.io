const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = require("./db");

const test = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa:", result.rows);
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

test();