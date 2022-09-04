const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const createSendToken = (req, res) => {
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) +
        24 * 60 * 60 * 1000
    ),
  });
  res.status(200).json({
    status: 'success',
    data: {
      role: 'admin',
    },
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(new Error('Username required'));
  }

  if (!password) {
    return next(new Error('Password required'));
  }

  const dn = `uid=${username},ou=system`;

  client.bind(dn, password, (err) => {
    if (err) {
      if (err.message.split(':')[0] === 'INVALID_CREDENTIALS') {
        return next(new Error('Invalid username or password'));
      }
      return next(err);
    } else {
      createSendToken(req, res);
    }
  });
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new Error('You are not logged in'));
  }

  try {
    await jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return next(err);
  }
};
