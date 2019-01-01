const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const status = new Spinner('Authenticating you, please wait...');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('FileFly', { horizontalLayout: 'full'})
    )
);

const inquirer = require('./lib/inquirer');

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
      inquirer.showMenu().then((answer) => {
        console.log(answer);
      });
      
    }, 2000);



    /*
    const newUser = await inquirer.askNewUserCredentials();
    console.log(newUser);*/
}

run();
