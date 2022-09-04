const ldap = require('ldapjs');

exports.createApplication = (req, res, next) => {
  const { organizationName } = req.params;

  const { name, userName, groupName } = req.body;

  if (!name) {
    return next(new Error('Name is required'));
  }

  if (!userName && !groupName) {
    return next(new Error('Name or Group name is required'));
  }

  let uniqueMember;

  if (userName) {
    uniqueMember = `cn=${userName},ou=users,o=${organizationName},ou=system`;
  }
  if (groupName) {
    uniqueMember = `ou=${groupName},ou=groups,o=${organizationName},ou=system`;
  }

  const groupEntry = {
    cn: name,
    uniqueMember,
    objectClass: 'groupOfUniqueNames',
  };

  client.add(
    `cn=${name},ou=applications,o=${organizationName},ou=system`,
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

exports.getApplication = (req, res, next) => {
  res.send('Route not defined');
};

exports.getAllApplications = async (req, res) => {
  const { organizationName } = req.params;

  try {
    const filter = 'cn=*';
    const parentDN = `ou=applications,o=${organizationName},ou=system`;
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

exports.updateApplication = (req, res, next) => {
  const { organizationName, applicationName } = req.params;

  const { cn, ou } = req.body;

  if (!cn && !ou) {
    return next(new Error('Name or Group name is required'));
  }

  let uniqueMember;

  if (cn) {
    uniqueMember = `cn=${cn},ou=users,o=${organizationName},ou=system`;
  }
  if (ou) {
    uniqueMember = `ou=${ou},ou=groups,o=${organizationName},ou=system`;
  }

  const change = new ldap.Change({
    operation: 'add',
    modification: {
      uniqueMember,
    },
  });

  client.modify(
    `cn=${applicationName},ou=applications,o=${organizationName},ou=system`,
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

exports.deleteApplication = (req, res, next) => {
  res.send('Route not defined');
};
