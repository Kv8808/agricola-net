const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'sql207.infinityfree.com',
  user: 'if0_40914253',
  password: 'lwOjtzZZPX',
  database: 'if0_40914253_atencion_clientes'
})

module.exports = pool