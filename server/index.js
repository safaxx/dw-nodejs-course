const http = require("http");
const fs = require("fs");
const url = require('url');

const myServer = http.createServer((req, res) => {
  //processes incoming requests
  const log = `${Date.now()}: ${req.method}: ${req.url}: New Request Received\n`;
  if(req.url === "/favicon.ico") return res.end();
  const parsed = url.parse(req.url, true);
  console.log(parsed);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (parsed.pathname) {
      case "/":
        res.end("home page");
        break;
      case "/about":
        if(parsed.query !== null ) res.end(`hey its me, ${parsed.query.name}!`);
        else res.end(`hey its me`);
        break;
      default:
        res.end('404 Not Found');
    }
  });
});
myServer.listen(8080, () => console.log("server started!"));
