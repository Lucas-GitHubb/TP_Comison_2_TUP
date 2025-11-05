import { body } from 'express-validator';
import { campoTexto } from './common.validation.js';

export const validarCrearComedor = [
  campoTexto('nombre'),
  campoTexto('direccion'),
  campoTexto('contacto'),
  campoTexto('telefono'),
];

export const validarActualizarComedor = [
  campoTexto('nombre').optional(),
  campoTexto('direccion').optional(),
  campoTexto('contacto').optional(),
  campoTexto('telefono').optional(),
];
