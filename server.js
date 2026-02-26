
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const atencionesRoutes = require('./routes/atenciones.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/atenciones', atencionesRoutes);


app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Servidor corriendo en puerto ${PORT}`));