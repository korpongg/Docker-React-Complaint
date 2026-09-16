require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const { sequelize, connectDB } = require("./config/dbConn");
const PORT = process.env.BACKEND_PORT || 5000;

const { v4: uuidv4 } = require("uuid");

connectDB();

// custom middleware logger
//app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
//app.use(cors(corsOptions));
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/api/", express.static(path.join(__dirname, "/public")));

// Main routes
app.use("/api/", require("./routes/root"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/logout", require("./routes/logout"));

//routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/affiliations", require("./routes/api/affiliations"));
app.use("/api/factions", require("./routes/api/factions"));
app.use("/api/departments", require("./routes/api/departments"));
app.use("/api/departmentsMed", require("./routes/api/departmentsMed"));
app.use("/api/riskManagement", require("./routes/api/riskManagement"));
app.use("/api/complaints", require("./routes/api/complaints"));
app.use("/api/complaintresponse", require("./routes/api/complaintresponse"));
app.use("/api/summarycomplaint", require("./routes/api/summarycomplaint"));
app.use("/api/supervisor", require("./routes/api/supervisor"));
app.use("/api/checksupervisor", require("./routes/api/checksupervisor"));

app.use("/api/filemanage", require("./routes/filemanage"));

const { WebSocketServer } = require("ws");
const WebSocket = require("ws");

const { addClient, removeClient } = require("./services/websocketManager");
const { executeAndStoreQueryResult } = require("./services/broadcastService");

const {
  getCenter1,
  getCenter2,
  getCenter3,
  getCenter4,
  getMenuCount,
} = require("./controllers/broadcastController");

// Spinning the HTTP server and the WebSocket server.
const server = http.createServer(app);
const wsServer = new WebSocketServer({ server, path: "/broadcast" });

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

//BoardCast Initialize the count of connected clients
let connectedClientsCount = 0;

// Function to handle new client connections
wsServer.on("connection", (connection) => {
  const userId = uuidv4();
  addClient(userId, connection);

connection.currentFilters = {};

  connectedClientsCount++;
  connection.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "PING":
          connection.send(
            JSON.stringify({
              type: "PONG",
            }),
          );
          break;

       case "GET_DATA":
connection.currentFilters[data.requestType] = data.payload || {};

let result = [];

switch (data.requestType) {

  case "DATA1":
    result = await getCenter1(data.payload);
    break;

  case "DATA2":
    result = await getCenter2(data.payload);
    break;

  case "DATA3":
    result = await getCenter3(data.payload);
    break;

  case "DATA4":
    result = await getCenter4(data.payload);
    break;


  case "COUNT":
    result = await getMenuCount(data.payload);
    break;
}


connection.send(
 JSON.stringify({
   type:
     data.requestType === "COUNT"
       ? "COUNT_DATA"
       : "CENTER_DATA",

   requestType:data.requestType,

   data:result
 })
);

break;
        case "GET_COUNT":
          const count = await getMenuCount(data.payload);

          connection.send(
            JSON.stringify({
              type: "COUNT_DATA",
              data: count[0],
            }),
          );

          break;
      }
    } catch (err) {
      console.error(err);
    }
  });

  connection.on("close", () => {
    removeClient(userId);
    connectedClientsCount--;
  });
});

// Set up the interval to run the function every 5 seconds
// Global variable to store the interval ID

// Serve static files from the React app
const FRONTEND_PORT = process.env.BACKEND_PORT2 || 3500;
const app2 = express();
app2.use(express.static(path.join(__dirname, "/frontend/dist")));
app2.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/dist/index.html"));
});

app2.use(errorHandler);

app2.listen(FRONTEND_PORT, () => {
  console.log(`Server running on port ${FRONTEND_PORT}`);
});
