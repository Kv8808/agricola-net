require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/atenciones', require('./routes/atenciones.routes'))

app.use(require('./middleware/error.middleware'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Servidor corriendo en puerto', PORT))