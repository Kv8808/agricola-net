
const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const { body } = require('express-validator');
const validate = require('../middleware/validator.middleware');

router.post('/register',
  [
    body('username').isLength({ min: 3 }).withMessage('username mínimo 3 chars'),
    body('password').isLength({ min: 6 }).withMessage('password mínimo 6 chars'),
    body('role').optional().isIn(['admin','user'])
  ],
  validate,
  controller.register
);

router.post('/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  validate,
  controller.login
);

module.exports = router;