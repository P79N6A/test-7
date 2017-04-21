const fsp = require('fs-promise');
fsp.writeFile('hello.txt', 'hello world')
   .then( () => fsp.readFile('hello.txt', 'utf8'))
   .then(con => console.log(con));
 