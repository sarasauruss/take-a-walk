let hero;
let pellets;
let bushes, dirt;
let bushImg, dirtImg;
let bush1Img, bush2Img, bushesImg;
var bushSprites;
var bushSprites_width = 10;
var bushSprites_height = 10;
var numBushSprites;
var numPellets;
let backSprites, backImg;
var backSpritesWidth = 10;
var backSpritesHeight = 10;
var numBackSprites;
let textBox;
var font;
let splashBack;
var stage = 0;
var picked = 0;
var numFlowers;
let bouquet;
var interval;
var timesRun = 0;
let caveImg, caveSprite;
let gemImg, gem;
let gemP = 0;

function preload() {
	hero = new Sprite(100, 24, 32, 32);
	hero.spriteSheet = 'assets/AnimationSheet_Character.png';
	bush1Img = loadImg('assets/dirt bush.png');
	bush2Img = loadImg('assets/dirt bush2.png');
	dirtImg = loadImg('assets/dirt path 2.png');
	flwrImg = loadImg('assets/flower.png');
	bushesImg = loadImg('assets/bushes.png');
	backImg = loadImg('assets/row of back 4.png');
	font = loadFont('assets/dpcomic.ttf');
	splashBack = loadImg('assets/floweback.png');
	bouquet = loadImg('assets/boq.png');
	caveImg = loadImg('assets/cave.png');
	gemImg = loadImg('assets/gem.png');
}

function setup() {
	new Canvas(windowWidth/4, windowHeight, 'pixelated x4');

	textAlign(CENTER);
	imageMode(CENTER);

	//hero
	hero.x = width/2;
	hero.y = height/8;
	hero.anis.offset.x = 2;
	hero.anis.frameDelay = 14;

	hero.addAnis({
		idle: { line: 0, frames: 2, frameDelay: 24 },
        idleblink: {line: 1, frames: 2},
		walk: {line: 2, frames: 4 },
        run: {line: 3, frames: 8},
        curtsy: {line: 4, frames: 6},
        jump: {line: 5, frames: 8},
        disintegrate: {line: 6, frames: 4},
        fall: {line: 7, frames: 8},
        magic: {line: 8, frames: 8}
	});

	//background 
	
	backSprites = new Group();

	numBackSprites = 30;
	for (let i = 0; i < numBackSprites; i++){
		let backSprite = createSprite(
			width/2 + 7,
			i*11.2,
			backSpritesWidth,
			backSpritesHeight,
			'none'
		);
		backSprites.add(backSprite);
		backSprite.img = backImg;
		backSprite.scale = .35;
		backSprites.layer = 1;
	}

	bushSprites = new Group();
	
	numBushSprites = 30;
	for (let i = 0; i < numBushSprites; i = i + 1){
		let bushSpriteRight = createSprite(
			width/2 + 100, 
			i*11.2, 
			bushSprites_width, 
			bushSprites_height,
			'static'
			)
		let bushSpriteLeft = createSprite(
			width/2 - 100,
			i*11.2, 
			bushSprites_width,
			bushSprites_height,
			'static'
			)	
			bushSpriteLeft.img = bush1Img;
			bushSpriteLeft.scale = .35;
			bushSpriteRight.scale = .35;
			bushSpriteRight.img = bush2Img;
			bushSprites.add(bushSpriteRight);
			bushSprites.add(bushSpriteLeft);
			bushSpriteLeft.rotation = 180;
			bushSpriteRight.rotation = 180;
	}
	
	//cave 
	caveSprite = new Sprite(width/2 + 250, hero.position.y + 10, 100, 50, 'none');
	caveSprite.img = caveImg;
	caveSprite.scale = .4;
	
	gem = new Sprite(caveSprite.x - 100, height, 'kinematic');
	gem.img = gemImg;
	gem.scale = .15;

	//pellets
	pellets = new Group();
	pellets.img = flwrImg;
	numFlowers = 71;
	
	for (let i = 2; i < numFlowers + 2; i++) {
		new pellets.Sprite(random((width/2 - 90), (width/2 + 90)), i * 15, 2.3, 'kinematic');
	}

	hero.overlaps(gem, collectGem);
	hero.overlaps(pellets, collectPellets);	
	caveSprite.layer = 1;
	hero.layer = 2;

	textBox = new Sprite();
	
	textBox.collider = 'none';
	textBox.w = 150;
	textBox.h = 50;
	textBox.color = 'white';
	textBox.stroke = 'black';
	textBox.text = "weeeeee"
	textBox.textSize = 35;

	//textBox.layer = 1;
	
	bushSprites.visible = false;
	backSprites.visible = false;
	hero.visible = false;
	pellets.visible = false;
	caveSprite.visible = false;
	gem.visible = false;
	
}
function collectGem(hero, gem){
	gem.remove();
	gemP++;
}
function collectPellets(hero, pellet){
	pellet.remove(); 
	picked++;
}

function draw() {
	clear();
	background('green');

	camera.on();

	if(stage == 0){
		splash();
	} else if(stage == 1){
		game();
	} else if(stage == 2){
		end();
	}
	
}

function splash(){
	picked = 0;
	gemP = 0;
	image(splashBack, 0, 0, width*2, height/2);
	textFont(font);
	fill(255);
	stroke(0);
	strokeWeight(4.5);
	textSize(width/8);
	text('take a walk', width/2, height/8);
	textSize(width/40);
	strokeWeight(3);
	text('click the screen to start', width/2, height/5.5);

	if(mouseIsPressed){
		stage++;
	}
}


function game(){
	background('green');
	noCursor();
	backSprites.visible = true;
	bushSprites.visible = true;
	hero.visible = true;
	pellets.visible = true;
	caveSprite.visible = false;
	gem.visible = false;
	
	

	var firstBushSprite = bushSprites[0];
	if (firstBushSprite.position.y <= camera.position.y - 510){
		bushSprites.remove(firstBushSprite);
		firstBushSprite.position.y = 
			firstBushSprite.position.y + numBushSprites * firstBushSprite.height + 180; //change the place they regenerate
		bushSprites.add(firstBushSprite);
	}

	var firstBackSprite = backSprites[0];
	if (firstBackSprite.position.y <= camera.position.y - 510){
		backSprites.remove(firstBackSprite);
		firstBackSprite.position.y = 
			firstBackSprite.position.y + numBackSprites * firstBackSprite.height + 180;
		backSprites.add(firstBackSprite);
	}
	
	
	if (kb.presses('r')) hero.ani = 'run';
	if (kb.presses('j')) hero.ani = 'jump';
	if (kb.presses('l')) hero.ani = 'curtsy';

	hero.speed = 1;

	//walking animations and controls
	if (kb.pressing('up')) {
		hero.direction = -90;
		hero.ani = 'walk';
	} else if (kb.pressing('down')) {
		hero.direction = 90;
		hero.ani = 'walk';
	} else if (kb.pressing('left')) {
		hero.direction = 180;
    	hero.mirror.x = true;
		hero.ani = 'walk';
	} else if (kb.pressing('right')) {
		hero.direction = 0;
    	hero.mirror.x = false;
		hero.ani = 'walk';
	} else {
	  	hero.speed = 0;
		hero.ani = 'idle';
	}

	if (hero.position.y >= height/9 && hero.position.y < height - 60){
		camera.position.y = hero.position.y + 405.5;
	}

	if(hero.position.y >= height +50 ){
		hero.ani = 'idle';
		hero.speed = 0;
		stage++;
	}

	textSize(width/20);
	text(picked, width/ 2, height - 200);


	//GLITCHES!
	if(hero.rotationSpeed !=0){
		interval = setInterval(textGlitch(), 1);
	} else {
		textBox.visible = false;
	}

	if(hero.position.y >= firstBushSprite.position.y - 10 && ((hero.position.x > width/2 + 100) || (hero.position.x < width/2 - 100)) && gemP == 0){
		cave();
	}
	
	
}

function textGlitch(){
	textBox.visible = true;
	textBox.pos = {x: width/2, y: camera.position.y - 300};
}

function cave(){
	background('black');
	bushSprites.visible = false;
	backSprites.visible = false;
	pellets.visible = false;
	caveSprite.visible = true;
	gem.visible = true;
	caveSprite.y = backSprites[4].y;
	gem.y = caveSprite.y + 20;
	

}
function end(){

	bushSprites.visible = false;
	backSprites.visible = false;
	hero.visible = false;
	pellets.visible = false;
	textBox.visible = false;

	//rect(width/2, height/9, 100,100);
	camera.position.y = height + 350;
	image(splashBack, width/2, height, width*2, height/2);
	
	if(gemP > 0){
		textFont(font);
		fill(255);
		stroke(0);
		strokeWeight(3);
		textSize(width/13);
		text("here's your gem", width/2, height -80);
		image(gemImg, width/2, height - 27, 50, 50);
		textSize(width/25);
		text("take another walk?", width/2, height + 40);
	} else if (picked >= (numFlowers-2)){
		textFont(font);
		fill(255);
		stroke(0);
		strokeWeight(3);
		textSize(width/13);
		text("here's your bouquet", width/2, height -80);
		image(bouquet, width/2, height - 27, 50, 60);
		textSize(width/25);
		text("take another walk?", width/2, height + 40);
	} else {
		textFont(font);
		fill(255);
		stroke(0);
		strokeWeight(3);
		textSize(width/25);
		text("take another walk?", width/2, height - 30);
		
	}
	
	//if(mouseIsPressed){
	//	stage = 1;
	//}
}


/*
recycled code

	bushes = new Group();
	//bushes.x = 0;
	bushes.img = bushesImg;
	bushes.scale = .5;
	bushes.layer = 1;
	bushes.collider = 'none';

	for (let i = 0; i< 5; i++){
		let bushesSpriteLeft = new bushes.Sprite();
		bushesSpriteLeft.y = i * 300;
		bushesSpriteLeft.x = 0;
		let bushesSpriteRight = new bushes.Sprite();
		bushesSpriteRight.y = bushesSpriteLeft.y;
		bushesSpriteRight.x = 450;
	}
	
	dirt = new Group();
	dirt.x = width/2;
	dirt.img = dirtImg;
	dirt.scale = .35;
	dirt.layer = 1;
	dirt.collider = 'none';

	while (dirt.length < 5){
		let dirtSprite = new dirt.Sprite();
		dirtSprite.y = dirt.length * 190;
	}
	*/