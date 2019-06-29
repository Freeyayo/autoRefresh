import "../css/style.scss";

interface nodeInterface {
	element: any,
	next: object | null
}

interface ValuePairInterface {
	key: any,
	value: any,
	print(): void
}

interface LinklistInterface {
	head: any,
	length: number,
	setHead(element:any): void,
	append(element:any): boolean,
	remove(element:any): boolean,
	print():void
}

interface HashTableInterface {
	table: Array<any>,
	put(key:string, value:any) :boolean,
	get(key:string): object | boolean,
	remove(key:any) :boolean,
	print(): void
}

const node: nodeInterface = {
	element: null,
	next: null,
}

const ValuePair: ValuePairInterface = {
	key: null,
	value: null,
	print(){
		console.log(`key_${this.key} value_${this.value}`);
	}
}

const Linklist: LinklistInterface = {
	head: null,
	length: 0,
	setHead(element){
		this.head = Object.create(node);
		this.head.element = element;
		this.head.next = null;
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
		current.next = null;
		this.length++;
		return true;
	},
	remove(element){
		if(!this.head){
			return false;
		};
		let current = this.head;
		if(current.element === element){
			current.element = null;
			length --;
			return true;
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
	},
	print(){
		console.log(this.head)
	}
}

const HashTable: HashTableInterface = {
	table: [],
	put(key, value){
		// this.table[loseloseHashCode(key)] = value;
		const valuePair = Object.create(ValuePair);
		Object.assign(valuePair,{key, value})
		if(this.table[loseloseHashCode(key)] === undefined){
			this.table[loseloseHashCode(key)] = Object.create(Linklist);
		}
		this.table[loseloseHashCode(key)].append(valuePair)
		console.log(loseloseHashCode(key),value);
		return true;
	},
	get(key){
		const keyPosition =  this.table[loseloseHashCode(key)];
		if(keyPosition.length === 0)return false;
		let current = keyPosition.head;
		let next = current.next;
		if(current.element.key === key){
			let currentKey = current.element.key;
			let currentValue = current.element.value;
			return { currentKey , currentValue };
		}else{
			while(current.next){
				current = current.next;
				if(current.element.key === key){
					let currentKey = current.element.key;
					let currentValue = current.element.value;
					return { currentKey , currentValue };
				}
			}
		}
		return false;
	},
	remove(key){
		const keyPosition =  this.table[loseloseHashCode(key)];
		if(keyPosition.length === 0)return false;
		let current = keyPosition.head;
		let next = current.next;
		if(current.element.key === key){
			keyPosition.head = next;
			keyPosition.length --;
			return true;
		}else{
			while(current.next){
				let previous = current;
				current = current.next;
				if(current.element.key === key){
					previous.next = current.next;
					keyPosition.length --;
					return true;
				}
			}
		}
		return false;
	},
	print(){
		console.table(this.table)
	}
}

function loseloseHashCode(key:string){
	let hash = 0;
	for(let i = 0; i < key.length; i++){
		hash += key.charCodeAt(i);
	}
	return hash % 37;
}

HashTable.put("caiconghao","18227107290");
HashTable.put("caicongha","763615809");

HashTable.remove("caicongha");

HashTable.put("caicongha","qq");
HashTable.put("diandian","qq");

HashTable.print();

console.table(HashTable.get("diandian"))













