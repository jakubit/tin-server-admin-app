const inquirer = require('inquirer');

module.exports = {
  delete: async () => {
    const answer = await inquirer.prompt(fileNameQuestion);
    return answer;
  },
  showDirectory: async () => {
    const answer = await inquirer.prompt(directoryQuestion);
    return answer;
  }
}

const fileNameQuestion = [
  {
    type: "input",
    name: "fileName",
    message: "Enter file name:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter file name.';
      }
    }
  }
];

const directoryQuestion = [
  {
    type: "input",
    name: "directory",
    message: "Enter directory:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter directory.';
      }
    }
  }
];
