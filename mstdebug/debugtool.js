var settings = require('./settings');
var path = require('path');
var fs = require('fs');


var indexHtml = settings.html;
var htmlPath = path.resolve(indexHtml);
var isOverride = settings.isOverride;

var html, modMap, config;
var re = /<script>[^>]*var config = (\{[\s\S]*?)<\/script>/im;


function eachKey (obj, fn) {
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(obj[key], key, obj);
        }
    }
}

function init() {
    html = fs.readFileSync(htmlPath, 'utf8');
    var m = html.match(re);
    if (m) {
        html = html.replace(re, function (scriptTag, config) {
            return scriptTag.replace(config, '__config_holder__');
        });
        config = m[1].replace(/[\t\n]*$/, '');
        try {
            config = eval('('+config+')' );
            modMap = {}; // {999: '999-share', ...}
            config.data.moduleList.forEach(function(module, i) {
                modMap[module.style_id] = module.style_id + '-' + module.module_type_id;
            });
            // console.log(config);
        } catch (e) {
            console.warn('[warn]: parse json err...');
        }
    } else {
        console.warn('[warn]: do not match the script');
    }
}


function map2files(type) { // js, css, html
    init();

    function map2file(con, key) {
        var fname = modMap[key] + '.' + type;
        var fpath = path.resolve('cmps/' + type, fname);
        var exists = fs.existsSync(fpath);

        var tips = '';
        var writeFile = function() {
            fs.writeFileSync(fpath, con);
        };

        if (exists) {
            if (isOverride) {
                writeFile();
                tips = 'override [' + type + '] file: ' + fname;
            } else {
                tips = 'exists [' + type + '] file: ' + fname;
            }
        } else {
            writeFile();
            tips = 'create [' + type + '] file: ' + fname;
        }

        console.log(tips);
    }

    var key = type + 'List';
    if (!Object.keys(config.data[key]).length) {
        console.log('[msg]: %s is empty!', key);
    }
    eachKey(config.data[key], map2file);
}

function files2map (type) {
	init();
	var map = {};

	function file2map (fname) {
        if(modMap){
            var styleId = fname.split('-')[0];
            if (!modMap[styleId]) {
                return;
            }
        }
		var fpath = path.resolve(folder, fname);
		var fcon = fs.readFileSync(fpath, 'utf8');
		var key = fname.split('-').shift();
		
		map[key] = fcon;
	}

	var folder = path.resolve('cmps/'+type);
	var files = fs.readdirSync(folder);
	files.forEach(file2map);

	var key = type+'List';
	config.data[key] = map;

	var strConf = JSON.stringify(config).replace(/<\/script>/g, '<\\/script>');
	html = html.replace('__config_holder__', strConf+'\r\n');
	fs.writeFileSync(htmlPath, html);

	console.log('update html for [' + type + '] OK!');
}

module.exports = {
	files2map: files2map,
	map2files: map2files
};


