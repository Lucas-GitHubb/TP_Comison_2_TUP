import { body } from 'express-validator';
import { campoTexto } from './common.validation.js';

export const validarCrearDonador = [
  campoTexto('nombre'),
  campoTexto('apellido'),
  campoTexto('contacto'),
];

export const validarActualizarDonador = [
  campoTexto('nombre').optional(),
  campoTexto('apellido').optional(),
  campoTexto('contacto').optional(),
];
