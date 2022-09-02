const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//-------------------------------------------------------------------
//-------------------------------------------------------------------

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

//-------------------------------------------------------------------
//-------------------------------------------------------------------

// Log in
// Successful response includes the user's id, firstName, lastName, email, and token
router.post('/', validateLogin, async (req, res, next) => {

  const { credential, password } = req.body

  const user = await User.login({ credential, password })

  if (!credential || !password) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    })
  }

  if (!user) {
    res.status(401)
    return res.json({
      "message": "Invalid credentials",
      "statusCode": 401
    })
  }

  //find jwt token
  const token = await setTokenCookie(res, user)

  // //https://sequelize.org/api/v6/class/src/model.js~model
  // user.dataValues.token = token
  // return res.json(user)

  const userObj = user.toJSON()
  userObj.token = token
  delete userObj.createdAt
  delete userObj.updatedAt

  return res.json(userObj)
})


// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' })
})


// Restore session user & get current user
router.get('/', [restoreUser, requireAuth], async (req, res) => {
  const { user } = req

  if (user) {
    return res.json({
      user: user.toSafeObject()
    })
  } else {
    res.status(401)
    return res.json({
      message: "Authentication required",
      statusCode: 401
    })
  }
})




module.exports = router;
