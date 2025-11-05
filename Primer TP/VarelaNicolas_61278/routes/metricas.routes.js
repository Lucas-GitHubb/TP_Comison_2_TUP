import { Router } from 'express';
import {
    obtenerTotalVentas,
    obtenerProductoMasVendido,
    obtenerStockProductos,
    obtenerCantidadUsuarios
} from '../controllers/metricas.controller.js'; 

const router = Router();

router.get('/total-ventas', obtenerTotalVentas);
router.get('/producto-mas-vendido', obtenerProductoMasVendido);
router.get('/stock-productos', obtenerStockProductos);
router.get('/cantidad-usuarios', obtenerCantidadUsuarios);

export default router;