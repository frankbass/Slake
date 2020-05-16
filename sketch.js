let img;

function preload() {
	img = loadImage("e.jpg");
}

function setup() {
	createCanvas(800, 400);
	image(img, 0,0, width/2, height);

}

function draw() {
	fill(255);
	rect(400, 0, 400, 400);
	let n = img.get(mouseX*29, mouseY*29, 20*29, 20*29);
	image(n, 500, 100, 200, 200);
	// console.log(mouseX);
}
