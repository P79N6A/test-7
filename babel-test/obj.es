//variable attribute
let age = 20;
let name = 'sindy';

var obj = {
	age,
	name
};

console.log(obj);

//function value
var person = {
	hello(){
		console.log('nice to meet you!');
	}
};

person.hello();

//computed attribute
let prefix = 'type';

let goods = {
	[prefix+'-mini']: 100
};

console.log(goods);


//template string
let add10 = function(n){
	return n + 10;
};

console.log(`he is ${ add10(8) } years old`);

//let and const
function getx() {
  {
    let x = 10;
    {
     let x = 100;
    }
    console.log('x=', x);
  }
}

getx();

//for..of..
let friends = ['lufy', 'nami', 'zoro'];
for(let fd of friends){
	console.log(fd);
}

