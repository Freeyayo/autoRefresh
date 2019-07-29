function watch(target, property, callback){

	let value = target[property];

	Object.defineProperty(target, property, {
		get(){
			return value;
		},
		set(newVal){
			value = newVal;
			callback(value);
		}
	})
	target[property] = value;
}

