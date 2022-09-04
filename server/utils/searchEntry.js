module.exports = (filter, parentDN, attributes) => {
  return new Promise((resolve, reject) => {
    const opts = {
      filter,
      scope: 'sub',
      attributes,
    };

    client.search(parentDN, opts, (err, ldapRes) => {
      if (err) {
        reject(err);
      }
      let data = [];

      ldapRes.on('searchEntry', (entry) => {
        data.push(entry.object);
      });

      ldapRes.on('error', (err) => {
        reject(err);
      });

      ldapRes.on('end', (result) => {
        resolve(data);
      });
    });
  });
};
