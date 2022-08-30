const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body

  //status 400 is given when body validations for the email, firstName, or lastName are violated
  if (!username || !email || !firstName || !lastName) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    })
  }

  //status 403 is given when the specified email/ username already exists
  const existingEmail = await User.findOne({
    where: { email }
  })

  if (existingEmail) {
    res.status(403)
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    });
  }

  const existingUsername = await User.findOne({
    where: { username }
  })

  if (existingUsername) {
    res.status(403)
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    });
  }

  const user = await User.signup({ firstName, lastName, email, username, password })

  //find jwt token & set as user attribute
  const token = await setTokenCookie(res, user)
  user.dataValues.token = token

  return res.json(user)
}
);


module.exports = router;
