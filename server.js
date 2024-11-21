import http from "http";
import app from "./app.js";
const PORT = process.env.Port || 5000;
const server = http.createServer(app);

server.listen(PORT, function () {
  console.log("Server running on port" + PORT);
});
