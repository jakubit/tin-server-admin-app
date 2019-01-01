const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const status = new Spinner('Authenticating you, please wait...');
const features = require('./lib/features');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('FileFly', { horizontalLayout: 'full'})
    )
);

const inquirer = require('./lib/inquirer');

const menuHandler = () => {
  inquirer.showMenu().then((answer) => {
    console.log(answer);
    switch (answer.option) {
      case '1':
        // Create new user
        features.createNewUser();
        break;
      case '2':
        // Delete user
        features.deleteUser();
        break;
      case '3':
        // Edit user
        features.editUser();
        break;
      case '4':
        // Show users
        features.showUsers();
        break;
      case '5':
        // Show catalog
        features.showCatalog();
        break;
      case '6':
        // Delete file
        features.deleteFile();
        break;
      case '7':
        // Turn on the service
        features.turnOnService();
        break;
      case '8':
        // Turn off the service
        features.turnOffService();
        break;
      case '9':
        break;
    };
    return answer.option;
  }).then((option) => {
    if (option != 9)
      menuHandler();
  });
}

const run = async () => {
    const credentials = await inquirer.askAdminCredentials();
    /*
    * Logowanie:
    * 1. Utworz socket
    * 2. Polacz sie i wyslij dane logowanie
    * 3. Jesli ok to wyswietl menu, jesli nie ok to wyswietl blad
    */
    status.start();

    setTimeout(() => {
      status.stop();
      console.log(credentials);

      // Pokaz menu
      menuHandler();

    }, 1000);



    /*
    const newUser = await inquirer.askNewUserCredentials();
    console.log(newUser);*/
}

run();
