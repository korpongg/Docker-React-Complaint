// websocketManager.js
const WebSocket = require("ws");
const clients = {};

function broadcastMessage(message) {
  const currentDate = new Date().toLocaleString("en-GB", { hour12: false });

  console.log(
    `Broadcasting Complaint Report message to ${Object.keys(clients).length} clients At ${currentDate}.`
  );

  Object.values(clients).forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
      } catch (error) {
        console.error("Error sending message to a client:", error);
      }
    }
  });
}


const addClient = (clientId, connection) => {
  clients[clientId] = connection;
};


const removeClient = (clientId) => {
  delete clients[clientId];
};


module.exports = {
  clients,   // 👈 เพิ่มตัวนี้
  addClient,
  removeClient,
  broadcastMessage
};