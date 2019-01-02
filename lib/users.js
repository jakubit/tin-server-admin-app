const inquirer = require('inquirer');

module.exports = {
  createNew: async () => {
    const answer = await inquirer.prompt(newUserQuestions);
    return answer;
  },
  delete: async () => {
    const answer = await inquirer.prompt(usernameQuestion);
    return answer;
  },
  edit: async () => {
    const answer = await inquirer.prompt(usernameQuestion);
    //console.log(answer);
    const updatedUser = await inquirer.prompt(updateUserQuestions);
    updatedUser.username = answer.username;

    return updatedUser;
  },
  show: async () => {
    // wyslij komunikat do serwera, wyswietl odpowiedz
    const answer = "UZYTKOWNICY";
    return answer;
  },


}

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
    /*
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter public space.';
      }
    }*/
  },
  {
    type: "input",
    name: "private",
    message: "Enter private space:",
    /*
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter private space.';
      }
    }*/
  }
];

const updateUserQuestions = [
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
    /*
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter public space.';
      }
    }*/
  },
  {
    type: "input",
    name: "private",
    message: "Enter private space:",
    /*
    validate: function(value) {
      if (typeof value == 'number') {
        return true;
      } else {
        return 'Please enter private space.';
      }
    }*/
  }
];

const usernameQuestion = [
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
  }
];
