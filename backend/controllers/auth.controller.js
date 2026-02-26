const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    try {
        const { username, password, role } = req.body

        const hash = await bcrypt.hash(password, 10)

        await pool.query(
            'INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)',
            [username, hash, role || 'user']
        )

        res.json({ message: 'Usuario creado' })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE username = ?',
            [username]
        )

        if (!rows.length)
            return res.status(401).json({ message: 'Credenciales inválidas' })

        const user = rows[0]

        const valid = await bcrypt.compare(password, user.password)

        if (!valid)
            return res.status(401).json({ message: 'Credenciales inválidas' })

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'clave_super_secreta',
            { expiresIn: '1h' }
        )

        res.json({ token })
    } catch (err) {
        next(err)
    }
}