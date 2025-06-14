const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const folderPath = path.join(__dirname, 'files');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const fileName = parsedUrl.query.file;

  if (!fileName) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Please provide a file name using ?file=filename.txt');
  }

  const filePath = path.join(folderPath, fileName);

  if (req.method === 'POST' && parsedUrl.pathname === '/create') {
    fs.writeFile(filePath, 'Sample file content.', (err) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error creating file');
      }
      res.writeHead(201);
      res.end('File created successfully');
    });
  }

  else if (req.method === 'GET' && parsedUrl.pathname === '/read') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  }

  else if (req.method === 'DELETE' && parsedUrl.pathname === '/delete') {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        return res.end('File not found');
      }
      res.writeHead(200);
      res.end('File deleted successfully');
    });
  }

  else {
    res.writeHead(404);
    res.end('Invalid endpoint or method');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
