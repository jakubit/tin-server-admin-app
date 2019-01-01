const inquirer = require('inquirer');

const loginQuestions = [
    {
        name: 'username',
        type: 'input',
        message: 'Enter your username:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your username.';
            }
        }

    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your password.';
            }
        }

    }
];

const menuOptions = [
  "Create new user",
  "Delete user",
  "Edit user",
  "Show users",
  "Show catalog",
  "Delete file",
  "Trun on the service",
  "Turn off the service"
];

const menu = [
  {
    type: "list",
    name: "option",
    message: "Choose option:",
    choices: menuOptions
  }
];

const newUserQuestions = [
  {
    type: "input",
    name: "username",
    message: "Enter username:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter username.';
      }
    }
  },
  {
    type: "password",
    name: "password",
    message: "Enter password:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter password.';
      }
    }
  },
  {
    type: "input",
    name: "public",
    message: "Enter public space:",
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter public space.';
      }
    }
  },
  {
    type: "input",
    name: "private",
    message: "Enter private space:",
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter private space.';
      }
    }
  }
];



module.exports = {
    askAdminCredentials: () => {
      return inquirer.prompt(loginQuestions);
    },
    askNewUserCredentials: () => {
      return inquirer.prompt(newUserQuestions);
    },
    showMenu: () => {
      return inquirer.prompt(menu);
    }
}
