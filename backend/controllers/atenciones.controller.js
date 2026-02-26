
const pool = require('../config/db');

function buildFilters(queryQ, params) {
  const { search, date_from, date_to } = queryQ;
  let clauses = [];
  if (search) {
    clauses.push("(nombre_cliente LIKE ? OR producto LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }
  if (date_from) {
    clauses.push("fecha >= ?");
    params.push(date_from);
  }
  if (date_to) {
    clauses.push("fecha <= ?");
    params.push(date_to);
  }
  return clauses.length ? ' AND ' + clauses.join(' AND ') : '';
}

exports.getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || null;
    const date_from = req.query.date_from || null;
    const date_to = req.query.date_to || null;
    const sort = req.query.sort || 'fecha DESC';

    const paramsCount = [];
    const baseWhere = ' WHERE 1=1';
    
    if (req.user.role !== 'admin') {
      paramsCount.push(req.user.id);
    }
    let whereClause = baseWhere;
    if (req.user.role !== 'admin') {
      whereClause += ' AND user_id = ?';
    }

    
    const extra = buildFilters({ search, date_from, date_to }, paramsCount);
    whereClause += extra;

    
    const countSql = `SELECT COUNT(*) as total FROM atenciones ${whereClause}`;
    const [countRows] = await pool.query(countSql, paramsCount);
    const total = countRows[0].total;

    
    const paramsData = [...paramsCount];
    const dataSql = `SELECT * FROM atenciones ${whereClause} ORDER BY ${pool.escapeId ? sort : 'fecha DESC'} LIMIT ? OFFSET ?`;

    paramsData.push(limit, offset);
    const [rows] = await pool.query(`SELECT * FROM atenciones ${whereClause} ORDER BY ${sort} LIMIT ? OFFSET ?`, paramsData);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      data: rows
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { id_empleado, nombre_cliente, producto, monto, fecha } = req.body;
    
    const user_id = req.user?.id || null;

    await pool.query(
      'INSERT INTO atenciones (id_empleado, nombre_cliente, producto, monto, fecha, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [id_empleado, nombre_cliente, producto, monto, fecha, user_id]
    );

    res.json({ message: 'Atención creada' });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = [];
    const values = [];
    const allowed = ['id_empleado','nombre_cliente','producto','monto','fecha'];

    for (const k of allowed) {
      if (req.body[k] !== undefined) {
        fields.push(`${k}=?`);
        values.push(req.body[k]);
      }
    }
    if (!fields.length) return res.status(400).json({ message: 'Nada que actualizar' });

    
    if (req.user.role !== 'admin') {
      
      const [r] = await pool.query('SELECT user_id FROM atenciones WHERE id_atencion=?', [id]);
      if (!r.length) return res.status(404).json({ message: 'Registro no encontrado' });
      if (r[0].user_id !== req.user.id) return res.status(403).json({ message: 'No autorizado para actualizar' });
    }

    values.push(id);
    const sql = `UPDATE atenciones SET ${fields.join(', ')} WHERE id_atencion=?`;
    await pool.query(sql, values);

    res.json({ message: 'Actualizado' });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM atenciones WHERE id_atencion=?', [id]);
    res.json({ message: 'Eliminado' });
  } catch (err) {
    next(err);
  }
};