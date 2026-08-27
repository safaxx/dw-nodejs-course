const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  //processes incoming requests
  const log = `${Date.now()}: ${req.url}: New Request Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("home page");
        break;
      case "/about":
        res.end("hey its me");
        break;
      default:
        res.end('404 Not Found');
    }
  });
});
myServer.listen(8080, () => console.log("server started!"));
