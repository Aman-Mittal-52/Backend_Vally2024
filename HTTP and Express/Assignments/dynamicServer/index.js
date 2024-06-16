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
                    let completed = 0;
                    files.forEach((file) => {
                        const filePath = path.join(dirPath, file); 
                        fs.stat(filePath, (err, stats) => {
                            if (err) {
                                res.write(`<li>Error reading ${file}</li>`);
                            } else {
                                const relativePath = path.join(req.url, file).replace(/\\/g, '/');
                                if (stats.isFile()) {
                                    res.write(`<li><a href="${relativePath}">&#128441; ${file}</a></li>`);
                                } else if (stats.isDirectory()) {
                                    res.write(`<li><a href="${relativePath}">&#128193; ${file}</a></li>`);
                                }
                            }
                            completed++;
                            if (completed === files.length) {
                                res.write("</ul>");
                                res.end("</body></html>");
                            }
                        });
                    });

                }
            });
        } else if (stats.isFile()) {
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
