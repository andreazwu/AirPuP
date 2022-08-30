const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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

// Log in
// Successful response includes the user's id, firstName, lastName, email, and token
router.post('/', validateLogin, async (req, res, next) => {

  const { credential, password } = req.body

  let user

  try {
    user = await User.login({ credential, password })

  } catch (err) {
    // status 400 is given when credentials / password not provided
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    });
  }

  // status 401 is given when invalid credentials are given
  if (!user) {
    res.status(401)
    return res.json({
      "message": "Invalid credentials",
      "statusCode": 401
    });
  }

  //find jwt token & set as user attribute
  const token = await setTokenCookie(res, user)

  //https://sequelize.org/api/v6/class/src/model.js~model
  user.dataValues.token = token

  return res.json(user)

  // let userObj = user.toJSON()
  // userObj.token = token
  // return res.json(userObj)

  // //does NOT work
  // user = user.toJSON()
  // user.token = token
  // return res.json({ ...user })
}
);


// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
}
);


// Restore session user & get current user
router.get('/', [restoreUser, requireAuth], async (req, res) => {
  const { user } = req

  if (user) {
    // //find jwt token & set as user attribute
    // //doesn't work
    // const token = await setTokenCookie(res, user)
    // user.dataValues.token = token

    return res.json({
      user: user.toSafeObject()
    })

  } else return res.json({})
}
);




module.exports = router;
