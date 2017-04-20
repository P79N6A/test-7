/**
 * @author: zheng.fuz[at]alibaba-inc.com
 * @date: 2012-07-05 14:33
 * 数据库工具集
 */

var mongodb = require('mongodb'),
	UtilTool = require('../tools/utils'),
	S = require('kissy').KISSY;

var DB = {},
	mongoDBManager = {};

var config = UtilTool.getJSONSync("config.json");

var connectMongodb = function(dbcfg, col, callback){
	var connectCol = function(d){// visit collection
		d.collection(col, function(err, _col){
			callback(_col, d);
		});
	};
	var key = null,
		db = null,
		connectStr;
	if(S.isString(dbcfg)){
		db = dbcfg;
	}else{
		key = dbcfg.key;
		db = dbcfg.db;
	}
	// mongodb://user:pass@host:27017/tms
	connectStr = 'mongodb://' + (key ? (key + '@') : '') + (config.db.domain || '127.0.0.1') + ':' + (config.db.port || 27017) +  '/' + db;
	console.log('----------> constr:', connectStr);
	if(!mongoDBManager[db]){
		mongoDBManager[db] = 'connecting'; // mongoDBManager.tms = 'connecting'
		mongodb.MongoClient.connect(connectStr, function(err, _db) {
			mongoDBManager[db] = _db;
			connectCol(mongoDBManager[db]);
		});
	}else{
		if(mongoDBManager[db] === 'connecting'){
			var timer = setInterval(function(){// keep try connect to the db : tms
				if(mongoDBManager[db] !== 'connecting'){
					clearInterval(timer);
					connectCol(mongoDBManager[db]);
				}
			}, 1);
		}else{
			connectCol(mongoDBManager[db]);
		}
	}
};

// 根据条件做简单查询
DB.findBy = function(db, col, by, opt, callback, project){
	opt = opt || {};
	connectMongodb(db, col, function(_col, _db){
		_col.count(by, function(err, c){// collection.count(condtion, callback);
			var $pipeline = [{$match: by}];
			if (opt) {
				opt.sort && $pipeline.push({ $sort : opt.sort });
				opt.limit && $pipeline.push({ $limit: Number(opt.limit) + Number(opt.skip || 0)});
				opt.skip && $pipeline.push({$skip: Number(opt.skip)});
			}

			// project 指定返回字段
			// 默认 all
			// project 语法 <field>: <1 or true>
			// https://docs.mongodb.com/manual/reference/operator/aggregation/project/
			project && $pipeline.push({$project: project});

			_col.aggregate($pipeline, {allowDiskUse: true}, function (err, result) {// collection.aggregate(condtion, opt, callback);
				callback(result, c);
			})
		});
	});
};

DB.findById = function(db, col, id, callback){
	if(S.isString(id)){
		id = getId(id);
	}
	connectMongodb(db, col, function(_col, _db){
		_col.find({'_id': id}).toArray(function(err, data) {// collection.find(cond).toArray(callback)
			callback(data ? (data[0] || null) : null);
		});
	});
};
DB.findByIds = function(db, col, ids, callback){
	var _idList = [];
	S.each(ids, function(d){
		if(S.isString(d)){
			d = getId(d);
		}
		_idList.push(d);
	});
	connectMongodb(db, col, function(_col, _db){
		_col.find({'_id': {'$in': _idList}}).toArray(function(err, data) {
			callback(data);
		});
	});
};


// 新增记录
DB.add = function(db, col, data, callback){
	connectMongodb(db, col, function(_col, _db){// collection.insert(data, callback)
		_col.insert(data, callback);
	});
};
// 修改记录
DB.updateBy = function(db, col, by, data, callback){
	connectMongodb(db, col, function(_col, _db){
		_col.update(by, data, {multi: true}, callback); // collection.update(cond, data, opt, callback);
	});
};
DB.updateById = function(db, col, id, data, callback){
	if(S.isString(id)){
		id = getId(id);
	}
	DB.updateBy(db, col, {'_id': id}, data, callback)
};

// 删除记录
DB.removeBy = function(db, col, by, callback){
	connectMongodb(db, col, function(_col, _db){
		_col.remove(by, callback);// collection.remove(cond, callback)
	});
}
DB.removeById = function(db, col, id, callback){
	if(S.isString(id)){
		id = getId(id);
	}
	DB.removeBy(db, col, {'_id': id}, callback)
}


// 获取 _id
var getId = function(id){// new mongodb.ObjectID(id);
	var ObjectID = mongodb.ObjectID;
	return new ObjectID(id);
};
DB.getId = getId;

// 连接
DB.connect = connectMongodb;

module.exports = DB;


