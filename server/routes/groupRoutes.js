const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controllers/admin/groupController');

router.route('/').post(createGroup);

router
  .route('/:groupName')
  .get(getGroup)
  .patch(updateGroup)
  .delete(deleteGroup);

module.exports = router;
