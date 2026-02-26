
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'clave_super_secreta';
const JWT_EXP = '6h'; 

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const [exists] = await pool.query('SELECT id FROM usuarios WHERE username = ?', [username]);
    if (exists.length) return res.status(400).json({ message: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)', [username, hash, role || 'user']);
    const userId = result.insertId;

    
    const token = jwt.sign({ id: userId, role: role || 'user' }, jwtSecret, { expiresIn: JWT_EXP });

    res.json({ message: 'Usuario creado', token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ message: 'Credenciales inválidas' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: JWT_EXP });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};