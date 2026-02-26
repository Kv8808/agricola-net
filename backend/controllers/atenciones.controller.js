const pool = require('../config/db')

exports.getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit

        const [rows] = await pool.query(
            'SELECT * FROM atenciones LIMIT ? OFFSET ?',
            [limit, offset]
        )

        res.json({
            page,
            limit,
            data: rows
        })
    } catch (err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { id_empleado, nombre_cliente, producto, monto, fecha } = req.body

        await pool.query(
            'INSERT INTO atenciones (id_empleado, nombre_cliente, producto, monto, fecha) VALUES (?, ?, ?, ?, ?)',
            [id_empleado, nombre_cliente, producto, monto, fecha]
        )

        res.json({ message: 'Atención creada' })
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { id_empleado, nombre_cliente, producto, monto, fecha } = req.body

        await pool.query(
            'UPDATE atenciones SET id_empleado=?, nombre_cliente=?, producto=?, monto=?, fecha=? WHERE id_atencion=?',
            [id_empleado, nombre_cliente, producto, monto, fecha, id]
        )

        res.json({ message: 'Actualizado' })
    } catch (err) {
        next(err)
    }
}

exports.remove = async (req, res, next) => {
    try {
        await pool.query(
            'DELETE FROM atenciones WHERE id_atencion=?',
            [req.params.id]
        )

        res.json({ message: 'Eliminado' })
    } catch (err) {
        next(err)
    }
}