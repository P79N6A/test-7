//default value
function hello (name="idle"){
	console.log(`hello ${name}!`);
}

hello();

//destruct setting
var arr = ['hello', 'young'];
let [a,b] = arr;
console.log(a,b);


//arrow function
var getName = (user) => user.name;


//spread and rest arguments
function sum(...args){
	console.log(args);
}


function add(a,b){
	return a + b;
}

var nums = [122,333];
add(...nums);


//lexical this ::不是这种场景, 这里this->undefined::
let Person = function(){
	this.age = 1;
	setTimeout(function(){
		this.age += 20;
		console.log('[age]:', this.age );
	}, 1000);
}
let p = new Person();

//arrow function and it's lexical this
let Person2 = function(){
	this.age = 1;
	setTimeout(()=>{
		this.age += 20;
		console.log('[age2]:', this.age );
	}, 1000);
}

let p2 = new Person2();