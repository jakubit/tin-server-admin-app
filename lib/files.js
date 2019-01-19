const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
  download: async () => {
    const answer = await inquirer.prompt(pathAndPriorityQuestion);
    return answer;
  },
  path: async () => {
    const answer = await inquirer.prompt(pathQuestion);
    return answer;
  },
  sendInquirer: async () => {
    const answer = await inquirer.prompt(sendQuestions);
    return answer;
  },
  send: async(localFilePath, remoteFilePath, server) => {
    const dataChunk = 1024;
    const file = fs.openSync(localFilePath, 'r');

    let buffer = Buffer.alloc(dataChunk);
    let bufferOffset = 0;
    let readBytes = fs.readSync(file, buffer, bufferOffset, dataChunk, null);

    let localPathArray = localFilePath.split('/');

    while (readBytes != 0) {
      encoded = buffer.toString('base64', 0, readBytes);
      const msg = {
        "type": "REQUEST",
        "command": "UPL",
        "name": localPathArray[localPathArray.length -1],
        "path": remoteFilePath,
        "data": encoded
      };
      server.write(JSON.stringify(msg) + '\0');
      readBytes = fs.readSync(file, buffer, bufferOffset, dataChunk, null);
    }

    const msg2 = {
      "type": "REQUEST",
      "command": "UPLFIN",
      "name": localPathArray[localPathArray.length -1],
      "path": remoteFilePath
    };
    server.write(JSON.stringify(msg2) + '\0');
  }
}

const pathQuestion = [
  {
    type: "input",
    name: "path",
    message: "Enter path:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter path.';
      }
    }
  }
];

const sendQuestions = [
  {
    type: "input",
    name: "localFilePath",
    message: "Enter local file path:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Enter local file path.';
      }
    }
  },
  {
    type: "input",
    name: "remoteFilePath",
    message: "Enter remote file path:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Enter remote file path.';
      }
    }
  }
];

const pathAndPriorityQuestion = [
  {
    type: "input",
    name: "path",
    message: "Enter path:",
    validate: function(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter path.';
      }
    }
  },
  {
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
  }
];
