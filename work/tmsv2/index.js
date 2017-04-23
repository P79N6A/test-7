const semver = require('semver');
const versionOK = semver.satisfies(process.version, '^7.9.0');
if (!versionOK) {
    require('babel-core/register'); // need babel trasnform
}

const app = require('./app');
app.run();

