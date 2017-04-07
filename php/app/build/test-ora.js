const ora = require('ora');
const spinner = ora('Loading foo').start();
setTimeout(() => {
 spinner.color = 'yellow';
 spinner.text = 'Loading rainbows';
}, 1000); 

setTimeout(() => {
// spinner.succeed('all finished');
 spinner.fail('fail for some reason...');
}, 2000);

//console.log(spinner.constructor.toString());

