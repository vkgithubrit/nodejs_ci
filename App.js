const fs = require('fs');

try {
    fs.writeFileSync('data.txt', 'Created in node.js');
    console.log("File written successfully");
} catch (e) {
    console.log(e);
}
try {
    const data = fs.readFileSync('data.txt', 'utf8');
    console.log( data);
} catch (e) {
    console.log(e);
}
