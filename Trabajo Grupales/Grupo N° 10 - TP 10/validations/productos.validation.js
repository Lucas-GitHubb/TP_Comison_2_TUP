import { body } from 'express-validator';
import { campoTexto } from './common.validation.js';

export const validarCrearProducto = [
  campoTexto('nombre'),
  body('cantidad')
    .isInt({ min: 0 })
    .withMessage('La cantidad debe ser un número entero no negativo'),
];

export const validarActualizarProducto = [
  campoTexto('nombre').optional(),
  campoTexto('descripcion').optional(),
  campoTexto('categoria').optional(),
  body('cantidad')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad debe ser un número entero no negativo'),
];
