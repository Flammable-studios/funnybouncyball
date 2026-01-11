// Bouncing Ball Simulation
// Jayson
// Date 1/10/2026

//Variables
let X = 50;
let Y = 290;
let VX = 3;
let VY = 5;
let gravity = 0.2;
let airResistance = 0.999;
let trail = [];
let mass = 1;
let bounceEfficiency = 0.8;
let isGrabbed = false;
let bounceSound;


//This function get run once at the start of the program
function setup() {
    createCanvas(1600, 1200);
    background(240);
    rectMode(CORNER);
    ellipseMode(CENTER);
    frameRate(60);
    bounceSound = createAudio('sm64_mario_boing.mp3');
}

function drawBall() {
    fill(255, 0, 0);
    ellipse(X, Y, 50, 50);

    if (!isGrabbed) {
        Y += VY;
        X += VX;
        VY += gravity;
        VY *= airResistance;
        VX *= airResistance;
        
        // Then handle bounces with efficiency
        bounceEfficiency = constrain(bounceEfficiency, 0, 1);
        if (Y >= height - 25) {
            VY = -VY * bounceEfficiency;
            Y = height - 25; // Prevent sinking into the ground
            bounceSound.stop();
            bounceSound.play();
        }
        if (Y <= 25) {
            VY = -VY * bounceEfficiency;
            Y = 25;
            bounceSound.stop();
            bounceSound.play();
        }
        if (X >= width - 25) {
            VX = -VX * bounceEfficiency;
            X = width - 25;
            bounceSound.stop();
            bounceSound.play();
        }
        if (X <= 25) {
            VX = -VX * bounceEfficiency;
            X = 25;
            bounceSound.stop();
            bounceSound.play();
        }
    } else {
        // When grabbed, follow the mouse
        X = mouseX;
        Y = mouseY;
    }
    
    mass = map(bounceEfficiency, 0, 1, 5, 1);

    trail.push({ x: X, y: Y });
    if (trail.length > 100) {
        trail.shift();
    }
    noFill();
    stroke(0, 0, 255);
    beginShape();
    for (let i = 0; i < trail.length; i++) {
        vertex(trail[i].x, trail[i].y);
    }
    endShape();
}

function mousePressed() {
    // Check if mouse is on the ball (within 25 pixel radius)
    let distance = dist(mouseX, mouseY, X, Y);
    if (distance < 25) {
        isGrabbed = true;
    }
}

function mouseReleased() {
    if (isGrabbed) {
        // Give the ball velocity based on mouse movement
        VX = (mouseX - pmouseX) * 2;
        VY = (mouseY - pmouseY) * 2;
    }
    isGrabbed = false;
}

function draw() {
    background(240);
    drawBall();
}