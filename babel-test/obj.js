'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//variable attribute
var age = 20;
var name = 'sindy';

var obj = {
	age: age,
	name: name
};

console.log(obj);

//function value
var person = {
	hello: function hello() {
		console.log('nice to meet you!');
	}
};

person.hello();

//computed attribute
var prefix = 'type';

var goods = _defineProperty({}, prefix + '-mini', 100);

console.log(goods);

//template string
var add10 = function add10(n) {
	return n + 10;
};

console.log('he is ' + add10(8) + ' years old');

//let and const
function getx() {
	{
		var x = 10;
		{
			var _x = 100;
		}
		console.log('x=', x);
	}
}

getx();

//for..of..
var friends = ['lufy', 'nami', 'zoro'];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = friends[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var fd = _step.value;

		console.log(fd);
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}
