import "../css/style.scss";

const Quene = [];
const Color = [];

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

console.log(toString());

// console.log(AdjList.get("A"));