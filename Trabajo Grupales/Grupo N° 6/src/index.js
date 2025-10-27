require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./config/db');
const PORT = Number(process.env.PORT || 3000);

(async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`🚀 API lista en http://localhost:${PORT}`));
})();

