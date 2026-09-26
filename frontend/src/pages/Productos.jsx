import { useEffect, useState } from "react";
import api from "../services/api";

function Productos() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        api.get("/productos")
            .then((respuesta) => {
                setProductos(respuesta.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }, []);

    return (
        <div>
            <h1>Productos</h1>

            {productos.map((producto) => (
                <p key={producto.id_producto}>
                    {producto.nombre}
                </p>
            ))}
        </div>
    );
}

export default Productos;