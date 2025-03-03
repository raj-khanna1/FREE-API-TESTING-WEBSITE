const http = require('http');
const fs = require('fs');
const path = require('path');

// const methods = require('./api_testing_website_data.js');

const PORT = process.env.PORT || 35711;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const mthd = req.method;
    const url = req.url;

    console.log("Request:", mthd, url);

    if (mthd === 'GET') {
        // ✅ Serve static files (HTML, CSS, JS)
        if (url === '/' || url === '/index.html' || url.endsWith('.css') || url.endsWith('.js')) {
            let filePath = url === '/' ? 'index.html' : url.substring(1); // Remove leading '/'
            filePath = path.join(__dirname, filePath);

            const extname = path.extname(filePath);
            const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.json': 'application/json'
            };
            const contentType = mimeTypes[extname] || 'application/octet-stream';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("File Not Found");
                } else {
                    res.writeHead(200, { "Content-Type": contentType });
                    res.end(data);
                }
            });
            return;
        }

        // ✅ API Endpoints
        if (url === '/api/users') {
            let ar = [];
            usersMap.forEach((val, key) => {
                ar.push({ id: key, userInfo: val });
            });
            res.end(JSON.stringify(ar));
        } 
        else if (url.startsWith('/api/users/')) {
            let tid = Number(url.split('/')[3]);
            if (usersMap.has(tid)) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(usersMap.get(tid)));
            } else {
                res.end("NO USER");
            }
        } 
        else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Unknown Request");
        }
    } 

    else if (mthd === 'POST') {
        let data = '';
        req.on('data', chunk => { data += chunk.toString(); });

        req.on('end', () => {
            try {
                let parsedBody = JSON.parse(data);
                
                if (url === '/api/users') {
                    usersMap.set(parsedBody.id, parsedBody.userInfo);
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("USER ADDED");
                } 
                else if (url === '/api/register') {
                    if (valid(parsedBody)) {
                        loginMap.set(parsedBody.uesrId, parsedBody.password);
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("USER SIGNED UP");
                    } else {
                        throw "Invalid data";
                    }
                } 
                else if (url === '/api/login') {
                    if (validLoginDetails(parsedBody)) {
                        res.end("LOGGED IN");
                    } else {
                        throw "Invalid login details";
                    }
                } 
                else {
                    res.end("Invalid Request");
                }
            } catch (error) {
                res.end("Bad POST Data, JSON required");
            }
        });
    } 

    else if (mthd === 'PUT') {
        let data = '';
        req.on('data', chunk => { data += chunk.toString(); });

        req.on('end', () => {
            try {
                let parsedBody = JSON.parse(data);
                if (usersMap.has(parsedBody.id)) {
                    usersMap.set(parsedBody.id, parsedBody.userInfo);
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("USER UPDATED");
                } else {
                    res.end("User Not Found");
                }
            } catch (error) {
                res.end("Invalid PUT Data, JSON required");
            }
        });
    } 

    else if (mthd === 'PATCH') {
        let data = '';
        req.on('data', chunk => { data += chunk.toString(); });

        req.on('end', () => {
            try {
                let parsedBody = JSON.parse(data);
                if (usersMap.has(parsedBody.id)) {
                    usersMap.set(parsedBody.id, parsedBody.userInfo);
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("USER UPDATED");
                } else {
                    res.end("User Not Found");
                }
            } catch (error) {
                res.end("Invalid PATCH Data, JSON required");
            }
        });
    } 

    else if (mthd === 'DELETE') {
        if (url.startsWith('/api/users/')) {
            let tid = Number(url.split('/')[3]);
            if (usersMap.has(tid)) {
                usersMap.delete(tid);
                res.end("Deleted.");
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("NO USER");
            }
        } else {
            res.end("Invalid DELETE Request");
        }
    } 

    else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
});

// Start the server
server.listen(PORT, () => {
    console.log("SERVER Started at PORT:", PORT);
});

// ✅ In-Memory Data Storage
let usersMap = new Map();
let loginMap = new Map();

usersMap.set(35711, { name: "Rana", job: "board member" });
loginMap.set("bhaskar@gmail.com", { uesrId: "bhaskar@gmail.com", password: "watchmen" });

// ✅ Helper Functions
function valid(obj) {
    return obj.uesrId && obj.password && !loginMap.has(obj.uesrId) && obj.uesrId.length > 0 && obj.password.length > 0;
}

function validLoginDetails(obj) {
    return obj.uesrId && obj.password && loginMap.has(obj.uesrId);
}
