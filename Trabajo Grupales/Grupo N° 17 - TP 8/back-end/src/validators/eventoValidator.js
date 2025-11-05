import Joi from "joi";

export const eventoSchema = Joi.object({
  nombre: Joi.string().required(),
  fecha: Joi.date().required(),
  lugar: Joi.string().required(),
});
