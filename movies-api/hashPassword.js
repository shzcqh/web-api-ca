const bcrypt = require('bcrypt');
const plainPassword = '123'; 
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('New Hashed Password:', hash);
});