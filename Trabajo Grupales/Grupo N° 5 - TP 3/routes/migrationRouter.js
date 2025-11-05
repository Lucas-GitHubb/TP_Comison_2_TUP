const express = require("express");
const {
  createDatabase,
  createTables,
  createData,
} = require("../controllers/migrationController");
const router = express.Router();

router.get('/create-db', createDatabase)
router.get('/create-tables', createTables)
router.get('/create-data', createData) 

module.exports = router;