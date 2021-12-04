const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const usersMock = [];
  usersMock.push(new User());
  usersMock.push(new User({
        login: "login2",
        name: "user2",
        password: "u2P@ssw0rd"
    }));
  return usersMock;
};

module.exports = { getAll };
