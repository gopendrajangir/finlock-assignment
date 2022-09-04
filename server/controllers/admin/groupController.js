const ldap = require('ldapjs');

exports.createGroup = (req, res, next) => {
  const { organizationName } = req.params;

  const { name, userName } = req.body;

  if (!name) {
    return next(new Error('Name is required'));
  }

  if (!userName) {
    return next(new Error('Name of atleast one user is required'));
  }

  const groupEntry = {
    cn: name,
    uniqueMember: `cn=${userName},ou=users,o=${organizationName},ou=system`,
    objectClass: 'groupOfUniqueNames',
  };

  client.add(
    `cn=${name},ou=groups,o=${organizationName},ou=system`,
    groupEntry,
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

exports.getGroup = (req, res, next) => {
  res.send('Route not defined');
};

exports.getAllGroups = async (req, res, next) => {
  const { organizationName } = req.params;

  try {
    const filter = 'cn=*';
    const parentDN = `ou=groups,o=${organizationName},ou=system`;
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

exports.updateGroup = (req, res, next) => {
  const { organizationName, groupName } = req.params;

  const { cn } = req.body;

  if (!cn) {
    return next(new Error('Name of user is required'));
  }

  const change = new ldap.Change({
    operation: 'add',
    modification: {
      uniqueMember: `cn=${cn},ou=users,o=${organizationName},ou=system`,
    },
  });

  client.modify(
    `cn=${groupName},ou=groups,o=${organizationName},ou=system`,
    change,
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

exports.deleteGroup = (req, res, next) => {
  res.send('Route not defined');
};
