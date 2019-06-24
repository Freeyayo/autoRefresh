import "../css/style.scss";

const node = {
	element: null,
	next: null
}

const ValuePair = {
	key: null,
	value: null,
	print(){
		console.log(`key_${this.key} value_${this.value}`)
	}
}

const Linklist = {
	head: null,
	length: 0,
	setHead(element){
		this.head = Object.create(node);
		this.head.element = element;
		length = 1;
	},
	append(element){
		if(!this.head){
			this.setHead(element);
			this.length ++;
			return true;
		};
		let current = this.head;
		while(current.next){
			current = current.next;
		}
		current.next = Object.create(node);
		current = current.next;
		current.element = element;
		this.length++;
	},
	remove(element){
		if(!this.head){
			this.setHead(element);
			this.length ++;
			return true;
		};
		let current = this.head;
		if(current.element === element){
			current.element = null;
			length --;
		}else{
			while(current.next){
				current = current.next;
				if(current.element === element){
					current.element = null;
					length --;
					return true;
				}
			}
			return false;
		}
		return true;
	},
	print(){
		console.log(this.head)
	}
}

const HashTable = {
	table: [],
	put(key, value){
		// this.table[loseloseHashCode(key)] = value;
		const valuePair = Object.create(ValuePair);
		valuePair.key = key;
		valuePair.value = value;
		if(this.table[loseloseHashCode(key)] === undefined){
			this.table[loseloseHashCode(key)] = Object.create(Linklist);
		}
		this.table[loseloseHashCode(key)].append(valuePair)
		console.log(loseloseHashCode(key),value);
	},
	get(key){

	},
	remove(key){

	},
	print(){
		console.log(this.table)
	}
}

function loseloseHashCode(key){
	let hash = 0;
	for(let i = 0; i < key.length; i++){
		hash += key.charCodeAt(i);
	}
	return hash % 37;
}

HashTable.put("caiconghao","18227107290");
HashTable.put("caiconghao","763615809");
HashTable.put("diandian","763615809");
HashTable.print()













