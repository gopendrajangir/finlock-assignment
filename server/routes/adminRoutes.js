const express = require('express');
const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');

const organizationRouter = require('./organizationRoutes');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.protect);

router.use('/organizations', organizationRouter);

module.exports = router;
