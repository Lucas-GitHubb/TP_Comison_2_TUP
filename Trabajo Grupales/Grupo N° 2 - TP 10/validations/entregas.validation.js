import { body } from 'express-validator';

export const validarCrearEntrega = [
  body('id_donador').isInt({ min: 1 }).withMessage('Debe indicar un donador válido'),
  body('id_producto').isInt({ min: 1 }).withMessage('Debe indicar un producto válido'),
  body('id_comedor').isInt({ min: 1 }).withMessage('Debe indicar un comedor válido'),
  body('cantidad').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
];

export const validarActualizarEntrega = [
  body('cantidad')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero positivo'),
  body('observaciones').optional().isString(),
];
