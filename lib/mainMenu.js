const inquirer = require('inquirer');
const newUser = require('./users');

module.exports = {
  menuHandler: async () => {
    const answer = await inquirer.prompt(menu);
    return answer;
  }
}

const menuOptions = [
  {
    name: "Create new user",
    value: "1",
  },
  {
    name: "Delete user",
    value: "2",
  },
  {
    name: "Edit user",
    value: "3",
  },
  {
    name: "Show user",
    value: "4",
  },
  {
    name: "Show catalog",
    value: "5",
  },
  {
    name: "Delete file",
    value: "6",
  },
/*
  {
    name: "Turn on the service",
    value: "7",
  },
  {
    name: "Turn off the service",
    value: "8",
  },
*/
  {
    name: "Download file",
    value: "9",
  },
  {
    name: "Abort download",
    value: "10",
  },
  {
    name: "Change download priority",
    value: "11"
  },
  {
    name: "Upload file",
    value: "12"
  },
  {
    name: "Exit",
    value: "13"
  }
];

const menu = [
  {
    type: "list",
    name: "option",
    message: "Choose option:",
    choices: menuOptions
  }
];

const menuHandler = async () => {
  const option = await inquirer.prompt(menu);
  return option;
}
