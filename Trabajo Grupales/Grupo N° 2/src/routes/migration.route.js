import { Router } from "express";
import { createData, createDatabase, createTables } from "../controllers/migration.controller.js";

const route = Router()

route.get('/create-db', createDatabase)
route.get('/create-tables', createTables)
route.get('/create-data', createData)

export default route;