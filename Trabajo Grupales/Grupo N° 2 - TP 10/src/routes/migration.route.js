import { Router } from 'express';
import { createData, createDatabase, createTables } from '../controllers/migration.controller.js';

const route = Router();

route.get('/create-db', async (req, res, next) => {
  try {
    await createDatabase(req, res);
  } catch (error) {
    next(error);
  }
});

route.get('/create-tables', async (req, res, next) => {
  try {
    await createTables(req, res);
  } catch (error) {
    next(error);
  }
});

route.get('/create-data', async (req, res, next) => {
  try {
    await createData(req, res);
  } catch (error) {
    next(error);
  }
});

export default route;
