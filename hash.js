const bcrypt = require("bcryptjs");

bcrypt.hash("suraj123", 12).then((hash) => {
  console.log(hash);
});
