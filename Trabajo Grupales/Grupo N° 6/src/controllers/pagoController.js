const pool = require('../config/db');

exports.crearPlanDePago = async (req, res) => {
  const { cliente_id, servicio_id, numero_cuotas } = req.body;
  
  if (![1, 3, 6].includes(numero_cuotas)) {
    return res.status(400).json({ error: 'El número de cuotas debe ser 1, 3 o 6.' });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [servicios] = await connection.query('SELECT precio_total FROM servicios WHERE id = ?', [servicio_id]);
    if (servicios.length === 0) {
      throw new Error('Servicio no encontrado');
    }
    const precioTotal = servicios[0].precio_total;
    const montoCuota = (precioTotal / numero_cuotas).toFixed(2);
    const fechaInicio = new Date();

    const [planResult] = await connection.query(
      'INSERT INTO planes_pago (cliente_id, servicio_id, numero_cuotas, fecha_inicio) VALUES (?, ?, ?, ?)',
      [cliente_id, servicio_id, numero_cuotas, fechaInicio]
    );
    const planPagoId = planResult.insertId;

    const cuotasPromises = [];
    for (let i = 1; i <= numero_cuotas; i++) {
      const fechaVencimiento = new Date(fechaInicio);
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + i);

      const query = connection.query(
        'INSERT INTO cuotas (plan_pago_id, numero_cuota, monto, fecha_vencimiento) VALUES (?, ?, ?, ?)',
        [planPagoId, i, montoCuota, fechaVencimiento]
      );
      cuotasPromises.push(query);
    }
    await Promise.all(cuotasPromises);

    await connection.commit();
    res.status(201).json({ message: 'Plan de pago y cuotas creados exitosamente', plan_pago_id: planPagoId });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error al crear el plan de pago', details: error.message });
  } finally {
    connection.release();
  }
};

exports.marcarCuotaComoPagada = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "UPDATE cuotas SET estado = 'PAGADO', fecha_pago = NOW() WHERE id = ? AND estado = 'PENDIENTE'",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cuota no encontrada o ya ha sido pagada.' });
    }
    res.status(200).json({ message: 'Cuota marcada como pagada.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cuota', details: error.message });
  }
};

exports.generarReporteCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const query = `
      SELECT
        c.nombre AS cliente_nombre,
        c.apellido AS cliente_apellido,
        s.nombre AS servicio_nombre,
        pp.id AS plan_pago_id,
        pp.numero_cuotas AS total_cuotas_plan,
        cu.id AS cuota_id,
        cu.numero_cuota,
        cu.monto,
        cu.fecha_vencimiento,
        cu.estado,
        cu.fecha_pago
      FROM clientes c
      JOIN planes_pago pp ON c.id = pp.cliente_id
      JOIN servicios s ON s.id = pp.servicio_id
      JOIN cuotas cu ON pp.id = cu.plan_pago_id
      WHERE c.id = ?
      ORDER BY pp.id, cu.numero_cuota;
    `;
    const [rows] = await pool.query(query, [clienteId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para este cliente.' });
    }
    
    const reporte = {
        cliente: {
            nombre: rows[0].cliente_nombre,
            apellido: rows[0].cliente_apellido
        },
        planes_de_pago: {}
    };

    rows.forEach(row => {
        if (!reporte.planes_de_pago[row.plan_pago_id]) {
            reporte.planes_de_pago[row.plan_pago_id] = {
                servicio: row.servicio_nombre,
                total_cuotas: row.total_cuotas_plan,
                cuotas: []
            };
        }
        reporte.planes_de_pago[row.plan_pago_id].cuotas.push({
            cuota_id: row.cuota_id,
            numero_cuota: row.numero_cuota,
            monto: row.monto,
            fecha_vencimiento: row.fecha_vencimiento,
            estado: row.estado,
            fecha_pago: row.fecha_pago
        });
    });


    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el reporte', details: error.message });
  }
};