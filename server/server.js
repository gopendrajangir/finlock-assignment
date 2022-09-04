const ldap = require('ldapjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is listening on port ${PORT}`);
    global.client = ldap.createClient({
      url: 'ldap://127.0.0.1:10389',
    });
  } else {
    console.log(err);
  }
});
