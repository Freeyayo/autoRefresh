import "../css/style.scss";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let originalX = canvas.width / 2;
let originalY = canvas.height / 2;
const Radius = .1;
const particles = [];

animation();

function Particle(x,y,radius,borderColor,innerColor){
	this.x = x;
	this.y = y;
	// this.velocity = .03 * Math.random() + .02;
	this.velocity = .001;
	this.radius = radius;
	this.borderColor = borderColor;
	this.innerColor = innerColor;
	this.radians = Math.random() * Math.PI * 2; 
	this.randomR = 100 + Math.random() * (canvas.width / 2);

	this.draw = () => {
		c.beginPath();
		c.strokeStyle = this.borderColor;
		c.fillStyle = this.innerColor;
		c.arc(this.x,this.y,this.radius,0,2*Math.PI);
		c.fill();
		c.stroke();
	}

	this.update = () => {
		this.radians += this.velocity;
		this.x = x + this.randomR*Math.sin(this.radians);
		this.y = y + this.randomR*Math.cos(this.radians);
		this.draw();
	}
}

function animation(){
	requestAnimationFrame(animation);
	c.fillStyle = `rgba(0,0,0,.04)`;
	c.fillRect(0,0,canvas.width,canvas.height);
	particles.forEach(particle => {
		particle.update();
	})
}

for(let i = 0; i < 100; i++){
	particles.push(new Particle(
				originalX,
				originalY,
				Radius,
				"#faf4e2",
				"#faf4e2"
				)
	)
}







