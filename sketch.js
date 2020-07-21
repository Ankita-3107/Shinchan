var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground, groundImage;
var bheam, bheamImg;
var gameOver, restart;
var score;
var laddooGroup, laddoImage;
var witch, alien;
var witchImg, alienImg;

function preload() {
    groundImage = loadImage("bg2.jpg");
    laddoImage = loadImage("bullet.png")
    bheamImg = loadImage("shinchan.png");
    witchImg = loadImage("emy1.png");
    alienImg = loadImage("emy2.png");
    gameOverImg = loadImage("over.jpeg");
    restartImg = loadImage("restart.jpeg");
    gunSound = loadSound("ak.mp3");
    overSound = loadSound("over.mp3");
}

function setup() {
    createCanvas(600, 400);


    bheam = createSprite(100, 330);
    bheam.addImage(bheamImg);
    bheam.scale = 0.25;

    witch = createSprite(200, 0);
    witch.addImage(witchImg);
    witch.scale = 0.2;
    witch.velocityY = 0.7;
    alien = createSprite(350, 0);
    alien.addImage(alienImg);
    alien.scale = 0.2;
    alien.velocityY = 0.7;

    laddooGroup = createGroup();

    gameOver = createSprite(300, 130);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300, 240);
    restart.addImage(restartImg);

    gameOver.scale = 0.7;
    restart.scale = 0.06;

    gameOver.visible = false;
    restart.visible = false;

    score = 0;
}

function draw() {
    background(groundImage)

    bheam.x = World.mouseX;
    createEdgeSprites();

    if (gameState === PLAY) {

        if (witch.isTouching(bheam)) {
            overSound.play();
            gameState = END;
        }

        if (alien.isTouching(bheam)) {
            overSound.play();
            gameState = END;
        }


        if (keyDown("space")) {
            gunSound.play();
            createBullet(bheam.x);
        }


        var rand = (Math.round(random(0, 1)));




        if (laddooGroup.isTouching(witch)) {
            if (frameCount % 10 === 0) {
                witch.destroy();
                witch = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));
                witch.addImage(witchImg);
                witch.scale = 0.2;
                witch.velocityY = 1;
                score = score + 2;
            }

        } else if (laddooGroup.isTouching(alien)) {
            if (frameCount % 10 === 0) {
                alien.destroy();
                alien = createSprite(Math.round(random(20, 580), Math.round(random(-400, 0))));
                alien.addImage(witchImg);
                alien.scale = 0.2;
                alien.velocityY = 1;
                score = score + 2;
            }

            score = score + 4;
        }

        if (alien.y > 400) {
            alien.x = Math.round(random(20, 390));
            alien.y = 0;
        } else if (witch.y > 400) {
            witch.x = Math.round(random(20, 390));
            witch.y = 0;
        }

        if (witch.y > 500) {
            score = score - 2;
        }
        if (alien.y > 500) {
            score = score - 2;
        }



    } else if (gameState === END) {

        witch.destroy();
        alien.destroy();
        laddooGroup.setVelocityXEach(0);
        bheam.visible = false;
        gameOver.visible = true;
        restart.visible = true;

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    fill("black");
    textSize(20);
    text("Score: " + score, 450, 50);

    drawSprites();
}

function createBullet(x) {
    var bullet = createSprite(100, 100, 5, 10);
    bullet.addImage(laddoImage);
    bullet.y = 360;
    bullet.scale = 0.10;
    bullet.x = x;
    bullet.velocityY = -1;
    bullet.lifetime = 1000;
    laddooGroup.add(bullet);
}





function reset() {
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    laddooGroup.destroyEach();
    bheam.visible = true;
    witch = createSprite(200, 0);
    witch.addImage(witchImg);
    witch.scale = 0.2;
    witch.velocityY = 0.7;
    alien = createSprite(350, 0);
    alien.addImage(alienImg);
    alien.scale = 0.2;
    alien.velocityY = 0.7;
    score = 0;
}