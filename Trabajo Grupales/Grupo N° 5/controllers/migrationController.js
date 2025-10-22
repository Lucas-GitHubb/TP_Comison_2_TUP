// controllers/migrationController.js (CJS)
const poolMigration = require('../config/connectionMigration');
const pool = require('../config/database'); // si querés usar la de app para inserts


const createDatabase = async (req, res) => {
  try {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      return res.status(400).json({ status: 400, payload: 'MYSQL_DATABASE no configurada' });
    }
    // Escapa el identificador con backticks
    await poolMigration.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    await poolMigration.query(`CREATE DATABASE \`${dbName}\``);
    res.json({ status: 200, payload: 'Database creada' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, payload: error.sqlMessage || 'Error al crear la base' });
  }
};

const createTables = async (req, res) => {
  try {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      return res.status(400).json({ status: 400, payload: 'MYSQL_DATABASE no configurada' });
    }
    await poolMigration.query(`USE \`${dbName}\`;`);
    await poolMigration.query(`
      -- TABLA PROVEEDORES
CREATE TABLE IF NOT EXISTS proveedores (
  id_proveedor INT NOT NULL AUTO_INCREMENT,
  nombre_proveedor VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  provincia VARCHAR(50) NOT NULL,
  calle VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10),
  estado_proveedor TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_proveedor DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_proveedor)
);

-- TABLA PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
  id_producto INT NOT NULL AUTO_INCREMENT,
  id_proveedor INT NOT NULL,
  nombre_producto VARCHAR(50) NOT NULL,
  categoria VARCHAR(80),
  precio DECIMAL(10,2) NOT NULL,
  estado_producto TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_producto DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_producto),
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);

-- TABLA STOCK
CREATE TABLE IF NOT EXISTS stock (
  id_stock INT NOT NULL AUTO_INCREMENT,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  estado_stock TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_stock DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_stock),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- TABLA MOVIMIENTOS DE STOCK 
CREATE TABLE IF NOT EXISTS movimientos_stock (
  id_movimiento INT NOT NULL AUTO_INCREMENT,
  id_producto INT NOT NULL,
  tipo ENUM('Entrada','Salida') NOT NULL,
  cantidad INT NOT NULL,
  stock_total INT NOT NULL,
  comentario VARCHAR(255),
  estado TINYINT NOT NULL DEFAULT 1,
  fecha_movimiento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_movimiento),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- TABLA USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL,
  rol ENUM('admin','user') NOT NULL DEFAULT 'user',
  estado_usuario ENUM('A','I') NOT NULL,
  email VARCHAR(100),
  PRIMARY KEY (id_usuario),
  UNIQUE (username),
  UNIQUE (email)
);
    `);

    res.json({ status: 200, payload: 'Tablas creadas' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 400, payload: 'Error al crear las tablas' });
  }
};

const createData = async (req, res) => {
  try {
    await pool.query(`
      INSERT INTO proveedores
  (id_proveedor, nombre_proveedor, email, telefono, pais, provincia, calle, codigo_postal, estado_proveedor)
    VALUES
  (1, 'Tech Components SRL', 'contacto@techcomponents.com', '+54 11 5555-1001', 'Argentina', 'Buenos Aires', 'Av. Siempre Viva 742', '1405', 1),
  (2, 'BioFarm S.A.',        'ventas@biofarm.com',         '+54 351 555-2002', 'Argentina', 'Córdoba',       'Bv. San Juan 1234',   '5000', 1),
  (3, 'Global Tools Ltd.',   'sales@globaltools.cl',        '+56 2 2555-3003',  'Chile',     'Santiago',     'Alameda 5678',        '8320000', 1),
  (4, 'Nordic Foods AB',     'hello@nordicfoods.se',        '+46 8 5555-4004',  'Suecia',    'Estocolmo',    'Drottninggatan 12',   '11151', 1),
  (5, 'Pacific Textiles Co.', 'info@pacifictextiles.pe',    '+51 1 555-5005',   'Perú',      'Lima',         'Av. Arequipa 456',    '15046', 1);

      INSERT INTO productos
  (id_producto, id_proveedor, nombre_producto, categoria, precio, estado_producto)
    VALUES
  (1, 1, 'Placa Madre ATX',          'Electrónica', 120.00, 1),
  (2, 2, 'Semillas de Trigo',        'Agroinsumos',  35.50, 1),
  (3, 3, 'Taladro Percutor 800W',    'Herramientas', 89.90, 1),
  (4, 4, 'Salmón Ahumado 500g',      'Alimentos',    15.75, 1),
  (5, 5, 'Tela Denim Azul',          'Textiles',      7.20, 1);

      INSERT INTO stock
  (id_stock, id_producto, cantidad, estado_stock)
    VALUES
  (1, 1,  45, 1),   
  (2, 2, 120, 1),   
  (3, 3,  30, 1),   
  (4, 4,  60, 1),   
  (5, 5, 200, 1);   

INSERT INTO movimientos_stock (id_producto, tipo, cantidad, stock_total, comentario, estado)
VALUES
  (1, 'Entrada', 50, 50, 'Compra inicial', 1),
  (1, 'Salida',   5, 45, 'Venta minorista', 1);

INSERT INTO movimientos_stock (id_producto, tipo, cantidad, stock_total, comentario, estado)
VALUES
  (2, 'Entrada', 150, 150, 'Ingreso a depósito', 1),
  (2, 'Salida',   30, 120, 'Pedido cliente #A102', 1);

INSERT INTO movimientos_stock (id_producto, tipo, cantidad, stock_total, comentario, estado)
VALUES
  (3, 'Entrada', 50, 50, 'Compra proveedor', 1),
  (3, 'Salida',  20, 30, 'Consumo interno', 1);

INSERT INTO movimientos_stock (id_producto, tipo, cantidad, stock_total, comentario, estado)
VALUES
  (4, 'Entrada', 40, 40, 'Recepción lote 001', 1),
  (4, 'Entrada', 20, 60, 'Recepción lote 002', 1);

INSERT INTO movimientos_stock (id_producto, tipo, cantidad, stock_total, comentario, estado)
VALUES
  (5, 'Entrada', 220, 220, 'Compra mayorista', 1),
  (5, 'Salida',   20, 200, 'Ajuste por merma', 1);

      INSERT INTO usuarios (id_usuario, username, password, rol, estado_usuario, email)
      VALUES
        (1, 'agustinS', '1122', 'admin', 'A', 'agustin@gmail.com'),
        (2, 'luisC', '2233', 'admin', 'A', 'luis@gmail.com'),
        (3, 'nicoS', '3344', 'user', 'A', 'nico@gmail.com'),
        (4, 'agustinC', '4455', 'user', 'A', 'chaza@gmail.com');
    `);

    res.json({ status: 200, payload: 'Datos insertados' });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: 400, payload: error.sqlMessage || 'Error al insertar los datos' });
  }
};

module.exports = {
  createDatabase,
  createTables,
  createData,
};
