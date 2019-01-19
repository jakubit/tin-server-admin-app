const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const status = new Spinner('Sending reuest...');
const mainMenu = require('./lib/mainMenu');
const inquirer = require('inquirer');
const users = require('./lib/users');
const login = require('./lib/login');
const files = require('./lib/files');
const service = require('./lib/service');

const net = require('net');
const fs = require('fs');

const server = net.Socket();
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let downloadList = ["Cancel"];
const downloadListMenu = [
  {
    type: "list",
    name: "file",
    message: "Choose download process.",
    choices: downloadList
  }
];

server.setKeepAlive(true,60000);
let chunk = "";
let endLineIndex;
let string;
let response;
let i = 0;
let bytes = 0;
let logged = 0;
let counter = 0;

// Client callback for incoming data
server.on('data', function(data) {
    chunk += data.toString();
    endLineIndex = chunk.indexOf('\n');

    while (endLineIndex > -1) {
        string = chunk.substring(0, endLineIndex);
        response = JSON.parse(string);

      // check if AUTH
      if (response.code == "200" && response.command == "AUTH" && logged == 0) {
        console.log(response);
        logged = 1;
        showMainMenu();
      } else if (response.code != "200" && response.command == "AUTH" && logged == 0) {
        // exit app
        console.log(response);
        auth();
      } else if (response.command == "DWL" && response.code == "206") {
        const fileData = response.data;
        const fileDecoded = Buffer.from(fileData, 'base64');
        const path = response.path;
        let array = path.split('/');
        let name = array[array.length - 1];
        fs.appendFileSync('dwl/' + name, fileDecoded);
      } else if (response.command == "DWLABORT" && response.code == "200") {
        // usun z listy
        downloadList.splice(downloadList.indexOf(response.data), 1);
        console.log(response);
        showMainMenu();
      } else if (response.command == "DWL" && response.code == "200") {
        downloadList.splice(downloadList.indexOf(response.path), 1);
        console.log(response);
      } else if (response.command == "UPLFIN" || response.command == "DWLABORT") {
        console.log(response);
      } else {
        showMainMenu();
      }
      chunk = chunk.substring(endLineIndex+1);
      endLineIndex = chunk.indexOf('\n');
      i++;
    }
});


// Client callback for closing socket
server.on('close', function() {
    console.log('Connection closed');
    server.destroy();
    process.exit(1);
});

// Display logo
clear();
console.log(
    chalk.yellow(
        figlet.textSync('ServerCLI', { horizontalLayout: 'full'})
    )
);

const auth = () => {
  login.login().then((answer) => {
    //console.log(answer);
    const msg = {
      "type": "REQUEST",
      "command": "AUTH",
      "username": answer.username,
      "password": answer.password
    };
    //console.log(msg);
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
  //console.log("SHOW MENU!");
  //console.log(counter);
  counter++;
  mainMenu.menuHandler().then((answer) => {
    switch (answer.option) {
      case '1':
        // Create new user
        users.createNew().then((answer) => {
          //console.log(answer);
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
          //console.log(answer);
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
          //console.log(answer);
          //server.write("EDIT_USER_REQUEST");
          const msg = {
	           "type": "REQUEST",
	           "command": "CHUSER",
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
      case '4':
        // Show user
        users.show().then((answer) => {
          //console.log(answer);
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
        files.path().then((answer) => {
          //console.log(answer);
          //server.write("SHOW_CATALOG_REQUEST");
          const msg = {
	           "type": "REQUEST",
	           "command": "LS",
	           "path": answer.path
           };
           server.write(JSON.stringify(msg) + '\0');
        })
        break;
      case '6':
        // Delete file
        files.path().then((answer) => {
          //console.log(answer);
          const msg = {
	           "type": "REQUEST",
	           "command": "RM",
	           "path": answer.path
           };
           server.write(JSON.stringify(msg) + '\0');
          //server.write("DELETE_FILE_REQUEST");
        });
        break;
      case '7':
        // Turn on the service
        service.turnOn().then((answer) => {
          console.log("TODO\n");

        });
        break;
      case '8':
        // Turn off the service
        service.turnOff().then((answer) => {
          console.log("TODO\n");
          //status.start();
        });
        break;
      case '9':
        // DWL
        files.download().then((answer) => {
          const msg = {
	           "type": "REQUEST",
	           "command": "DWL",
	           "path": answer.path,
             "priority": answer.priority
           };
           downloadList.push(answer.path);
           server.write(JSON.stringify(msg) + '\0');
           showMainMenu();
        });
        break;
      case '10':
        // DWL ABORT
        if (downloadList.length == 1) {
          console.log("No file is being downloaded.");
          showMainMenu();
        } else {
          inquirer.prompt(downloadListMenu).then((answer) => {
            if (answer.file != "Cancel") {
              const msg = {
    	           "type": "REQUEST",
    	           "command": "DWLABORT",
    	           "path": answer.file
               };
               console.log(JSON.stringify(msg));
               server.write(JSON.stringify(msg) + '\0');
            }
            showMainMenu();
          });
        }
        break;
      case '11':
      // DWL PRI
        if (downloadList.length == 1) {
          console.log("No file is being downloaded.");
          showMainMenu();
        } else {
          inquirer.prompt(downloadListMenu).then((answer) => {
            if (answer.file != "Cancel") {
              inquirer.prompt({
                type: "input",
                name: "priority",
                message: "Enter download priority:",
                validate: function(value) {
                  let parsed = parseInt(value, 10)
                  if (value == parsed && parsed > 0 && parsed < 11) {
                    return true;
                  } else {
                    return 'Please enter download priority. It must be between 1 and 10 included.';
                  }
                }
              }).then((answer2) => {
                const msg = {
                  "type": "REQUEST",
                  "command": "DWLPRI",
                  "path": answer.file,
                  "priority": answer2.priority
                };
                server.write(JSON.stringify(msg) + '\0');
                showMainMenu();
              });
            }
          });
        }
        break;
      case '12':
        // UPL
        files.sendInquirer().then((answer) => {
          files.send(answer.localFilePath, answer.remoteFilePath, server);
          showMainMenu();
        });
        break;
      case '13':
        server.destroy();
        break;
    };
  });
}
