const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const header = req.headers.authorization

    if (!header) return res.status(401).json({ message: 'No autorizado' })

    const token = header.split(' ')[1]

    try {
        const decoded = jwt.verify(token, 'clave_super_secreta')
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ message: 'Token inválido' })
    }
}