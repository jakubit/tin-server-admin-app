var net = require('net');

const fs = require('fs');

var client = net.Socket();
client.connect(3333, 'localhost', function() {
    console.log('Connected to server!');
    const msg = {
      "type": "REQUEST",
      "command": "AUTH",
      "username": "tiger",
      "password": "bonzo"
    };
    client.write(JSON.stringify(msg) + '\0');
    sendRequest();
});

function sendRequest() {
  const msg = {
    "type": "REQUEST",
    "command": "DWL",
    "name": "onet.html",
    "offset": 0,
    "path": ""
  };

  client.write(JSON.stringify(msg) + '\0');
}

client.on('data', function(data) {
    console.log('Received from server: ' + data);
    const response = JSON.parse(data);
    if (response.command == "DWL")
    {
      const fileData = response.data.data;
      const fileDecoded = new Buffer(fileData, 'base64');

      fs.writeFile(response.data.name, fileDecoded, () => {
        console.log("saved");
      });
    }
    //client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});
