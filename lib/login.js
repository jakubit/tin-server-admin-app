const inquirer = require('inquirer');

module.exports = {
  login: async () => {
    const answer = await inquirer.prompt(loginQuestions);
    return answer;
  }
}

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
