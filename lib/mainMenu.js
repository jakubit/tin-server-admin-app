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
    name: "Show users",
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
  {
    name: "Trun on the service",
    value: "7",
  },
  {
    name: "Turn off the service",
    value: "8",
  },
  {
    name: "Exit",
    value: "9"
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
   /*
   return await inquirer.prompt(menu).then((answer) => {
     console.log(answer);
     switch (answer.option) {
       case '1':
         // Create new user
         createNewUser();
         break;
       case '2':
         // Delete user
         deleteUser();
         break;
       case '3':
         // Edit user
         editUser();
         break;
       case '4':
         // Show users
         showUsers();
         break;
       case '5':
         // Show catalog
         showCatalog();
         break;
       case '6':
         // Delete file
         deleteFile();
         break;
       case '7':
         // Turn on the service
         turnOnService();
         break;
       case '8':
         // Turn off the service
         turnOffService();
         break;
       case '9':
         break;
     };
     return answer.option;
   }).then((option) => {
     if (option != 9)
       menuHandler();
   });*/
 }

const createNewUser = async () => {
  // new user questionnaire
  console.log("new user questionnaire");
  await newUser.handler();
};

const deleteUser = () => {
    // ask for username
    console.log("ask for username");
};

const editUser = () => {
  // ask for username, then for data to be changed
  console.log("ask for username, then for data to be changed");
};

const showUsers = () => {
  // simply display users
  console.log("simply display users");
};

const showCatalog = () => {
  // ask for directory
  console.log("ask for directory");
};

const deleteFile = () => {
  // ask for file name and directory
  console.log("ask for file name and directory");
};

const turnOnService = () => {
  // simply send command
  console.log("simply send command");
};

const turnOffService = () => {
  // simply send command
  console.log("simply send command");
};
