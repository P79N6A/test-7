/**
 * babel转码会把app文件夹的js，转移到runtime文件
 * 但是views下的模板不会，这里手工转移一下
 */
var fs = require('fs');
var path = require('path');


function createFolder(dir) {
    var exists = fs.existsSync(dir);
    if (!exists) {
        var err = fs.mkdirSync(dir);
        if (err) {
            console.error('[create folder]:', dir, '; err->', err.message);
            return;
        }
    }
}

// root/app/views -> root/runtime/views
function getTargePath(oldPath) {
    var ret = oldPath.replace(/([\/\\])app\1/, '$1runtime$1');
    return ret;
}


function walk(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(function(file, i) {
        var fpath = path.join(dir, file);
        var tfpath = getTargePath(fpath);

        var stat = fs.statSync(fpath);
        if (stat.isDirectory()) {
            createFolder(tfpath);
            walk(fpath);
        } else {
            var con = fs.readFileSync(fpath, 'utf8');
            var err = fs.writeFileSync(tfpath, con);
            if (err) {
                console.error('[write file error]:', tfpath, ' err->', err.message);
            } else {
                // console.log('copy: ', fpath , ' -> ', tfpath);
            }
        }

    });
}


function copyViewsFolder() {

    var viewsSrc = path.join(__dirname, '../app/views');
    var viewsTarget = path.join(__dirname, '../runtime/views');

    createFolder(viewsTarget);
    walk(viewsSrc);
}

copyViewsFolder();