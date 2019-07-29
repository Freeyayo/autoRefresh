import "../css/style.scss";

const Data = {};

function logAccessToProperties(obj){
	return new Proxy(obj, {
		get(target, key){
			console.log(`access the key ${key}`);
			return Reflect.get(target, key);
		},
		set(target, key, value){
			console.log(`set the key ${key} to ${value}`);
			Reflect.set(target, key, value);
			return true;
		}
	})
}

function observable(obj, onChange){
	return new Proxy(obj, {
		set(target, key, value){
			Reflect.set(target, key, value);
			onChange({key, value});
			return true;
		}
	})
}

const Person = {
	name: "cco",
	age: "27"
}

const access = logAccessToProperties(Person);

// access.name;

// access.age = "30";

const observablePerson = observable(Person, function({key, value}){
	console.log(`${key} has change to ${value}`)
})

// observablePerson.name = "cai";

// console.log(Person);

function getProp(URL){
	return new Proxy(Data,{
		get(target, key){
			 fetch(URL)
				  .then(response => response.json())
				  .then(json => {
				  		target[key] = json[key]
				  		return Reflect.get(target, key);
				  	})
			 
		}
	})
}

const getTitle = getProp('https://jsonplaceholder.typicode.com/todos/1');

console.log(getTitle.title);










