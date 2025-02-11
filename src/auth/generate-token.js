// generate-token.js
const jwt = require('jsonwebtoken');

const payload = {
  id: '67aa6e6b8181617109f31b52', //admins id 
  role: 'admin'
};

const secret = '94890caf845b5494d52aae793f11e95d80bf0437553bcf092a7de5aaf7a984cc';
const options = { expiresIn: '30d' };

const token = jwt.sign(payload, secret, options);

console.log(token);