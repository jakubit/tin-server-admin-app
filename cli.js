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

const server = net.Socket();
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const responseParser = require('./lib/responseParser');

// Client callback for incoming data
server.on('data', function(data) {
    //console.log('Received from server: ' + data);
    const response = JSON.parse(data);
    console.log(response);
    if (response.code != "200" && response.command == "AUTH") {
      // exit app
      server.destroy();
      process.exit(1);
    } else {
      showMainMenu();
    }
});

// Client callback for closing socket
server.on('close', function() {
    console.log('Connection closed');
    server.destroy();
});

// Display logo
clear();
console.log(
    chalk.yellow(
        figlet.textSync('Files', { horizontalLayout: 'full'})
    )
);

const auth = () => {
  login.login().then((answer) => {
    console.log(answer);
    const msg = {
      "type": "REQUEST",
      "command": "AUTH",
      "username": answer.username,
      "password": answer.password
    };
    console.log(msg);
    server.write(JSON.stringify(msg) + '\0');
    //status.start();
  });
};

// Connect and login
server.connect(config.port, config.host, () => {
  // login
  auth();
});

// Main menu
const showMainMenu = () => {
  mainMenu.menuHandler().then((answer) => {
    switch (answer.option) {
      case '1':
        // Create new user
        users.createNew().then((answer) => {
          console.log(answer);
          //client.write("NEW_USER_REQUEST");
          const msg = {
            "type": "REQUEST",
            "command": "CREATEUSER",
            "username": answer.username,
            "password": answer.password,
            "public": answer.public,
            "private": answer.private
          };
          //console.log(msg);
          server.write(JSON.stringify(msg) + '\0');
          //status.start();
        });
        break;
      case '2':
        // Delete user
        users.delete().then((answer) => {
          console.log(answer);
          //server.write("DELETE_USER_REQUEST");
          const msg = {
            "type": "REQUEST",
            "command": "DELETEUSER",
            "username": answer.username
          };
          //console.log(msg);
          server.write(JSON.stringify(msg) + '\0');
          //status.start();
        });
        break;
      case '3':
        // Edit user
        users.edit().then((answer) => {
          console.log(answer);
          //server.write("EDIT_USER_REQUEST");
          const msg = {
	           "type": "REQUEST",
	           "command": "CHUSER",
	           "username": answer.username,
	           "password": answer.password,
	           "public": answer.public,
	           "private": answer.private
           };
           console.log(msg);
           server.write(JSON.stringify(msg) + '\0');
           //status.start();
        });
        break;
      case '4':
        // Show user
        users.show().then((answer) => {
          console.log(answer);
          const msg = {
	           "type": "REQUEST",
	           "command": "USER",
	           "username": answer.username
           };
          server.write(JSON.stringify(msg) + '\0');
        })
        break;
      case '5':
        // Show catalog
        files.showDirectory().then((answer) => {
          console.log(answer);
          server.write("SHOW_CATALOG_REQUEST");
        })
        break;
      case '6':
        // Delete file
        files.delete().then((answer) => {
          console.log(answer);
          //server.write("DELETE_FILE_REQUEST");
        });
        break;
      case '7':
        // Turn on the service
        service.turnOn().then((answer) => {
          console.log(answer);
          //server.write("TURN_ON_REQUEST");
          const msg = {
            "type": "REQUEST",
            "command": "STARTUP"
          };
          console.log(msg);
          //server.write(JSON.stringify(msg) + '\0');
          //status.start();
        });
        break;
      case '8':
        // Turn off the service
        service.turnOff().then((answer) => {
          console.log(answer);
          //server.write("TURN_OFF_REQUEST");
          const msg = {
            "type": "REQUEST",
            "command": "SHUTDOWN"
          };
          console.log(msg);
          //server.write(JSON.stringify(msg) + '\0');
          //status.start();
        });
        break;
      case '9':
        server.destroy();
        break;
    };
  });
}
