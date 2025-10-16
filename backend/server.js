// Thư mục: backend
// Tên file: server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('✅ MySQL connected successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('🔄 All models were synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });