const express = require("express");
const cors = require("cors");
const conexion = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// Ruta principal
// =============================
app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend funcionando correctamente"
    });
});

// =============================
// Obtener clientes
// =============================
app.get("/clientes", (req, res) => {

    const sql = "SELECT * FROM clientes";

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error("Error al consultar clientes:", error);
            return res.status(500).json({
                error: "Error al obtener los clientes"
            });
        }

        res.json(resultados);
    });
});

// =============================
// Obtener productos
// =============================
app.get("/productos", (req, res) => {

    const sql = "SELECT * FROM productos";

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error("Error al consultar productos:", error);
            return res.status(500).json({
                error: "Error al obtener los productos"
            });
        }

        res.json(resultados);
    });
});

// =============================
// Obtener ventas
// =============================
app.get("/ventas", (req, res) => {

    const sql = `
        SELECT 
            v.id_venta,
            v.fecha_venta,
            v.total,
            v.estado,
            c.nomCliente
        FROM ventas v
        INNER JOIN clientes c 
            ON v.id_cliente = c.id_cliente
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {
            console.error("Error al consultar ventas:", error);
            return res.status(500).json({
                error: "Error al obtener las ventas"
            });
        }

        res.json(resultados);
    });
});

// =============================
// Iniciar servidor
// =============================
app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});

