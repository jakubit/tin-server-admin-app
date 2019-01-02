const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const status = new Spinner('Authenticating you, please wait...');
//const features = require('./lib/features');
const mainMenu = require('./lib/mainMenu');
//const inquirer = require('./lib/inquirer');
const users = require('./lib/users');
const login = require('./lib/login');
const files = require('./lib/files');
const service = require('./lib/service');


// Display logo
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Files', { horizontalLayout: 'full'})
    )
);

/*
* 1. Pobranie portu i adresu z pliku config
* 2. Utworzenie socketu do serwera
* 3. Logowanie
* 4. Menu główne
*/

const showMainMenu = () => {
  mainMenu.menuHandler().then((answer) => {
    switch (answer.option) {
      case '1':
        // Create new user
        users.createNew().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '2':
        // Delete user
        users.delete().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '3':
        // Edit user
        users.edit().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '4':
        // Show users
        users.show().then((answer) => {
          console.log(answer);
          showMainMenu();
        })
        break;
      case '5':
        // Show catalog
        files.showDirectory().then((answer) => {
          console.log(answer);
          showMainMenu();
        })
        break;
      case '6':
        // Delete file
        files.delete().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '7':
        // Turn on the service
        service.turnOn().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '8':
        // Turn off the service
        service.turnOff().then((answer) => {
          console.log(answer);
          showMainMenu();
        });
        break;
      case '9':
        break;
    };
  });
}

login.login().then((answer) => {
  status.start();

  setTimeout(() => {
    status.stop();
    console.log(answer);

    // menu glowne
    showMainMenu();

  }, 1000);
})




/*
const run = async () => {
    const credentials = await inquirer.askAdminCredentials();
    /*
    * Logowanie:
    * 1. Utworz socket
    * 2. Polacz sie i wyslij dane logowanie
    * 3. Jesli ok to wyswietl menu, jesli nie ok to wyswietl blad

    status.start();

    setTimeout(() => {
      status.stop();
      console.log(credentials);

      // Pokaz menu
      mainMenu.menuHandler();

    }, 1000);

    /*
    const newUser = await inquirer.askNewUserCredentials();
    console.log(newUser);
};

run();

*/
