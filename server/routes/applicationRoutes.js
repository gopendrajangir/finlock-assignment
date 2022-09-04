const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  getAllApplications,
} = require('../controllers/admin/applicationController');

router.route('/').post(createApplication).get(getAllApplications);

router
  .route('/:applicationName')
  .get(getApplication)
  .patch(updateApplication)
  .delete(deleteApplication);

module.exports = router;
