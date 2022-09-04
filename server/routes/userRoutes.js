const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/admin/userController');

router.route('/').post(createUser).get(getAllUsers);

// router.route('/:userName').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
