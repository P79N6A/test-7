'use strict';

//default value
function hello() {
	var name = arguments.length <= 0 || arguments[0] === undefined ? "idle" : arguments[0];

	console.log('hello ' + name + '!');
}

hello();

//destruct setting
var arr = ['hello', 'young'];
var a = arr[0];
var b = arr[1];

console.log(a, b);

//arrow function
var getName = function getName(user) {
	return user.name;
};

//spread and rest arguments
function sum() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	console.log(args);
}

function add(a, b) {
	return a + b;
}

var nums = [122, 333];
add.apply(undefined, nums);

//lexical this ::不是这种场景, 这里this->undefined::
var Person = function Person() {
	this.age = 1;
	setTimeout(function () {
		this.age += 20;
		console.log('[age]:', this.age);
	}, 1000);
};
var p = new Person();

//:arrow function and it's lexical this
var Person2 = function Person2() {
	var _this = this;

	this.age = 1;
	setTimeout(function () {
		_this.age += 20;
		console.log('[age2]:', _this.age);
	}, 1000);
};

var p2 = new Person2();
