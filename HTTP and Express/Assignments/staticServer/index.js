const http = require("http");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const PORT = 7700;

const server = http.createServer((req, res) => {
    let dirPath = '.'; 

    if (req.url !== '/') {
        dirPath = path.join('.', req.url);
    }

    fs.stat(dirPath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("404 Not Found");
            return;
        }

        if (stats.isDirectory()) {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    log('Error in reading content...');
                    log(err.message);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.setHeader('Content-Type', 'text/html');
                    res.write("<html><body>");
                    res.write(`<h1>Contents of ${req.url}</h1>`);
                    res.write("<ul>");
                    files.forEach((file) => {
                        const filePath = path.join(req.url, file).replace(/\\/g, '/');
                        res.write(`<li><a href="${filePath}">${file}</a></li>`);
                    });
                    res.write("</ul>");
                    res.end("</body></html>");
                }
            });
        } else {
            fs.readFile(dirPath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(data);
                }
            });
        }
    });
});

server.listen(PORT, () => {
    log("Server is running on port " + PORT);
});

// Export the server
module.exports = server;
