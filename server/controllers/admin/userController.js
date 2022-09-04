const searchEntry = require('../../utils/searchEntry');

exports.createUser = (req, res, next) => {
  const { organizationName } = req.params;

  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) {
    return next(new Error('Firstname and Lastname are required'));
  }

  const userEntry = {
    cn: firstname,
    sn: lastname,
    objectClass: 'inetOrgPerson',
    objectClass: 'organizationalPerson',
    objectClass: 'person',
  };

  client.add(
    `cn=${firstname},ou=users,o=${organizationName},ou=system`,
    userEntry,
    (err) => {
      if (err) {
        return next(err);
      } else {
        res.status(201).json({
          status: 'success',
        });
      }
    }
  );
};

exports.getAllUsers = async (req, res, next) => {
  const { organizationName } = req.params;

  try {
    const filter = 'cn=*';
    const parentDN = `ou=users,o=${organizationName},ou=system`;
    const attributes = ['cn'];
    const data = await searchEntry(filter, parentDN, attributes);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUser = (req, res, next) => {
  res.send('Hellooo');
};

exports.updateUser = (req, res, next) => {
  res.send('Route not defined');
};

exports.deleteUser = (req, res, next) => {
  const { organizationName, userName } = req.params;
  client.del(
    `cn=${userName},ou=users,o=${organizationName},ou=system`,
    (err) => {
      if (err) {
        return next(err);
      } else {
        res.status(204).json({
          status: 'success',
        });
      }
    }
  );
};
