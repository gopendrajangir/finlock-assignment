const createOrganizationUnitApplications = (organizationName, res, next) => {
  const applicationsEntry = {
    ou: 'applications',
    objectClass: 'organizationalUnit',
  };

  client.add(
    `ou=applications,o=${organizationName},ou=system`,
    applicationsEntry,
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

const createOrganizationUnitGroups = (organizationName, res, next) => {
  const groupsEntry = {
    ou: 'groups',
    objectClass: 'organizationalUnit',
  };

  client.add(
    `ou=groups,o=${organizationName},ou=system`,
    groupsEntry,
    (err) => {
      if (err) {
        return next(err);
      } else {
        createOrganizationUnitApplications(organizationName, res, next);
      }
    }
  );
};

const createOrganizationUnitUsers = (organizationName, res, next) => {
  const usersEntry = {
    ou: 'users',
    objectClass: 'organizationalUnit',
  };
  client.add(`ou=users,o=${organizationName},ou=system`, usersEntry, (err) => {
    if (err) {
      return next(err);
    } else {
      createOrganizationUnitGroups(organizationName, res, next);
    }
  });
};

const createOrganizationEntry = (name, res, next) => {
  const organizationEntry = {
    o: name,
    objectClass: 'organization',
  };

  client.add(`o=${name},ou=system`, organizationEntry, (err) => {
    if (err) {
      return next(err);
    } else {
      createOrganizationUnitUsers(name, res, next);
    }
  });
};

exports.createOrganization = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new Error('Organization name is required'));
  }

  createOrganizationEntry(name, res, next);
};

exports.getOrganization = (req, res, next) => {
  const { organizationName } = req.params;

  const opts = {
    filter: `o=${organizationName}`,
    scope: 'sub',
    attributes: ['o'],
  };

  client.search(`ou=system`, opts, (err, ldapRes) => {
    if (err) {
      return next(err);
    }
    let data = [];

    ldapRes.on('searchEntry', (entry) => {
      console.log(entry);
      data.push(entry.object);
    });

    ldapRes.on('end', (result) => {
      console.log(result);
      console.log(data);
      res.status(200).json({
        status: 'success',
        data,
      });
    });
  });
};

exports.updateOrganization = (req, res, next) => {
  const { organizationName, applicationName } = req.params;

  const { cn, ou } = req.body;

  let member;

  if (cn) {
    member = `cn=${cn},ou=users,o=${organizationName},ou=system`;
  } else {
    member = `ou=${ou},ou=groupName,o=${organizationName},ou=system`;
  }

  const change = new ldap.Change({
    operation: 'add',
    modification: {
      member,
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

exports.deleteOrganization = (req, res, next) => {
  const { organizationName } = req.params;
  client.del(`o=${organizationName},ou=service`, (err) => {
    if (err) {
      return next(err);
    } else {
      res.status(204).json({
        status: 'success',
      });
    }
  });
};
