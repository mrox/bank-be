const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
// eslint-disable-next-line import/newline-after-import
const erequestController = require('../../controllers/erequest.controller');
const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(erequestController.getERequests)
  .post(erequestController.createERequest)
  .put(erequestController.remoteERequest);
router.route('/config').post(erequestController.createEConfig).get(erequestController.getEConfig);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
