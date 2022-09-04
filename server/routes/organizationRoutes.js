const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  createOrganization,
  deleteOrganization,
  getOrganization,
} = require('../controllers/admin/organizationController');

const userRouter = require('./userRoutes');
const groupRouter = require('./groupRoutes');
const applicationRouter = require('./applicationRoutes');

router.route('/').post(createOrganization);
router
  .route('/:organizationName')
  .delete(deleteOrganization)
  .get(getOrganization);

router.use('/:organizationName/users', userRouter);

router.use('/:organizationName/groups', groupRouter);

router.use('/:organizationName/applications', applicationRouter);

module.exports = router;
