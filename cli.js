const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const status = new Spinner('Sending reuest...');
//const features = require('./lib/features');
const mainMenu = require('./lib/mainMenu');
//const inquirer = require('./lib/inquirer');
const users = require('./lib/users');
const login = require('./lib/login');
const files = require('./lib/files');
const service = require('./lib/service');

const net = require('net');
const fs = require('fs');

const client = net.Socket();
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Client callback for incoming data
client.on('data', function(data) {
    console.log('Received from server: ' + data);
    status.stop();
    showMainMenu();
});

// Client callback for closing socket
client.on('close', function() {
    console.log('Connection closed');
});

// Display logo
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Files', { horizontalLayout: 'full'})
    )
);

// Connect and login
login.login().then((answer) => {
  console.log(answer);
  client.connect(config.port, config.host, () => {
    client.write("LOGIN_REQUEST");
    status.start();
  });
})

// Main menu
const showMainMenu = () => {
  mainMenu.menuHandler().then((answer) => {
    switch (answer.option) {
      case '1':
        // Create new user
        users.createNew().then((answer) => {
          console.log(answer);
          client.write("NEW_USER_REQUEST");
          status.start();
        });
        break;
      case '2':
        // Delete user
        users.delete().then((answer) => {
          console.log(answer);
          client.write("DELETE_USER_REQUEST");
        });
        break;
      case '3':
        // Edit user
        users.edit().then((answer) => {
          console.log(answer);
          client.write("EDIT_USER_REQUEST");
        });
        break;
      case '4':
        // Show users
        users.show().then((answer) => {
          console.log(answer);
          client.write("SHOW_USERS_REQUEST");
        })
        break;
      case '5':
        // Show catalog
        files.showDirectory().then((answer) => {
          console.log(answer);
          client.write("SHOW_CATALOG_REQUEST");
        })
        break;
      case '6':
        // Delete file
        files.delete().then((answer) => {
          console.log(answer);
          client.write("DELETE_FILE_REQUEST");
        });
        break;
      case '7':
        // Turn on the service
        service.turnOn().then((answer) => {
          console.log(answer);
          client.write("TURN_ON_REQUEST");
        });
        break;
      case '8':
        // Turn off the service
        service.turnOff().then((answer) => {
          console.log(answer);
          client.write("TURN_OFF_REQUEST");
        });
        break;
      case '9':
        client.destroy();
        break;
    };
  });
}
