import "../css/style.scss";

interface dataInterface{
	[properName: string]: string
}

const Quene: string[] = [];
const Color: dataInterface = {};

const Vertices = ["A","B","C","D","E","F","G","H","I"];
const AdjList = new Map();

for(let i = 0; i < Vertices.length; i++){
	addVertex(Vertices[i]);
}

addEdges("A", "B");
addEdges("A", "C");
addEdges("A", "D");
addEdges("C", "D");
addEdges("C", "G");
addEdges("D", "G");
addEdges("D", "H");
addEdges("B", "E");
addEdges("B", "F");
addEdges("E", "I");

function addEdges(v: string, w: string): void{
	AdjList.get(v).push(w);
	AdjList.get(w).push(v);
}

function addVertex(v: string): void{
	AdjList.set(v, []);
}

function toString(): string {
	let s: string = "";
	Vertices.forEach((item: string, index: number) => {
		s += `${item} -> ${AdjList.get(item)}\n`; 
	})
	return s;
}

function initialColor(): void{
	Vertices.forEach((item: string) => {
		Color[item] = "white";
	})
}

function BFS(v: string, callback: Function): void{
	initialColor();
	Quene.push(v);
	while(Quene.length){
		let vertice = Quene.shift();
		Color[vertice] = "grey";
		let neighbour = AdjList.get(vertice);
		if(neighbour.length){
			neighbour.forEach((item: string) => {
				if(Color[item] === "white"){
					Color[item] = "grey";
					Quene.push(item);
				}
			})
		}
		Color[vertice] = "black";
		if(callback){
			callback(vertice);
		}
	}
}

function BFSForRoute(v: string, callback: Function): string | void{
	initialColor();
	const preVertice = new Map();
	const distance = new Map();

	for(let i = 0 ; i < Vertices.length; i++){
		distance.set(Vertices[i], 0);
		preVertice.set(Vertices[i], null);
	}

	Quene.push(v);
	while(Quene.length){
		let vertice = Quene.shift();	//shifting out vertice in Quene
		Color[vertice] = "grey";
		let neighbour = AdjList.get(vertice);
		if(neighbour.length){
			neighbour.forEach((item: string) => {
				if(Color[item] === "white"){
					distance.set(item, distance.get(vertice) + 1);	//mark the vertice
					preVertice.set(item, vertice);	//VERTICE is the previous one of every neighbour
					Color[item] = "grey";
					Quene.push(item);	//push all of the white vertices which can be found in a turn of loop
				}
			})
		}
		Color[vertice] = "black";
	}
	if(callback){
		callback({preVertice, distance});
	}
}

function generateRoutes(v: string, callback: Function){
	let fromVertice = v;
	let subQuene = Vertices.filter((item: string) => {
		return item !== fromVertice;
	})
	subQuene.forEach((item: string) => {
		let toVertice = item;
		let route = [];
		for(let v = toVertice; v !== null; BFSForRoute(fromVertice, function(result){
			v = result.preVertice.get(v);	//get previous vertice of v, then v equals to that, until v=null 
		})){
			route.push(v);
		}
		if(callback){
			callback(route)
		}
	})
}

// BFS(Vertices[1],function(vertice: string){
// 	console.log(vertice)
// })

BFSForRoute(Vertices[0],function(result: object){
	console.log(result)
})


generateRoutes(Vertices[0],function(route){
	console.log(route.reverse().join(" -> "));
})
















