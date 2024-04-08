const express = require('express');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
// const userController = require('../../controllers/user.controller');
// eslint-disable-next-line import/newline-after-import
const edataController = require('../../controllers/edata.controller');
const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .get(edataController.getEDatas)
  .post(edataController.createEData);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
