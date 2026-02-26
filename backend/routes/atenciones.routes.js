
const router = require('express').Router();
const controller = require('../controllers/atenciones.controller');
const auth = require('../middleware/auth.middleware');
const { body, query } = require('express-validator');
const validate = require('../middleware/validator.middleware');


router.get('/',
  auth,
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('search').optional().isString(),
    query('date_from').optional().isISO8601(),
    query('date_to').optional().isISO8601(),
    query('sort').optional().isString()
  ],
  validate,
  controller.getAll
);


router.post('/',
  auth,
  [
    body('id_empleado').isInt().withMessage('id_empleado debe ser entero'),
    body('nombre_cliente').isString().notEmpty(),
    body('producto').isString().notEmpty(),
    body('monto').isFloat({ gt: 0 }),
    body('fecha').isISO8601().withMessage('fecha inválida (YYYY-MM-DD)')
  ],
  validate,
  controller.create
);


router.put('/:id',
  auth,
  [
    body('id_empleado').optional().isInt(),
    body('nombre_cliente').optional().isString(),
    body('producto').optional().isString(),
    body('monto').optional().isFloat({ gt: 0 }),
    body('fecha').optional().isISO8601()
  ],
  validate,
  controller.update
);


router.delete('/:id',
  auth,
  auth.verifyRole('admin'),
  controller.remove
);

module.exports = router;