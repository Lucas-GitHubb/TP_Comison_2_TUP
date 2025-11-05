import { param, body } from 'express-validator';

export const validarId = [
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
];

export const campoTexto = (campo) =>
  body(campo)
    .isString()
    .trim()
    .notEmpty()
    .withMessage(`El campo ${campo} es obligatorio y debe ser texto`);
