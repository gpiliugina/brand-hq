const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = 4178;

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/archive-wireframe.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    const ext = path.extname(file).toLowerCase();
    const type = ext === ".html" ? "text/html" :
                 ext === ".js" ? "text/javascript" :
                 ext === ".css" ? "text/css" :
                 ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
                 ext === ".png" ? "image/png" : "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
}).listen(PORT, () => console.log("serving on " + PORT));
