// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];

let circleX = 320; // Initial x position of the circle
let circleY = 240; // Initial y position of the circle
const circleSize = 100; // Diameter of the circle

let trajectory = []; // Array to store the trajectory points for the thumb
let isDrawing = false; // Flag to track if the thumb is inside the circle

let indexTrajectory = []; // Array to store the trajectory points for the index finger
let isIndexDrawing = false; // Flag to track if the index finger is inside the circle

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Draw the circle
  fill(0, 255, 0, 150);
  noStroke();
  circle(circleX, circleY, circleSize);

  // Draw the trajectory for the thumb
  stroke(0, 0, 255); // Blue for thumb
  strokeWeight(2);
  noFill();
  beginShape();
  for (let point of trajectory) {
    vertex(point.x, point.y);
  }
  endShape();

  // Draw the trajectory for the index finger
  stroke(255, 0, 0); // Red for index finger
  strokeWeight(2);
  noFill();
  beginShape();
  for (let point of indexTrajectory) {
    vertex(point.x, point.y);
  }
  endShape();

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Get the position of the thumb (keypoint 4) and index finger (keypoint 8)
        let thumb = hand.keypoints[4].position;
        let indexFinger = hand.keypoints[8].position;

        // Calculate the distance between the thumb and the circle
        let dThumb = dist(thumb.x, thumb.y, circleX, circleY);
        let dIndex = dist(indexFinger.x, indexFinger.y, circleX, circleY);

        if (dThumb < circleSize / 2) {
          // Move the circle to follow the thumb
          circleX = thumb.x;
          circleY = thumb.y;

          // Add the current position to the thumb trajectory
          trajectory.push({ x: thumb.x, y: thumb.y });
        } else if (dIndex < circleSize / 2) {
          // Move the circle to follow the index finger
          circleX = indexFinger.x;
          circleY = indexFinger.y;

          // Add the current position to the index finger trajectory
          indexTrajectory.push({ x: indexFinger.x, y: indexFinger.y });
        }

        // Draw lines connecting keypoints 0 to 4
        if (hand.keypoints.length > 4) {
          stroke(hand.handedness == "Left" ? color(255, 0, 255) : color(255, 255, 0));
          strokeWeight(2);
          for (let i = 0; i < 4; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Draw lines connecting keypoints 5 to 8
        if (hand.keypoints.length > 8) {
          for (let i = 5; i < 8; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Draw lines connecting keypoints 9 to 12
        if (hand.keypoints.length > 12) {
          for (let i = 9; i < 12; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Draw lines connecting keypoints 13 to 16
        if (hand.keypoints.length > 16) {
          for (let i = 13; i < 16; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Draw lines connecting keypoints 17 to 20
        if (hand.keypoints.length > 20) {
          for (let i = 17; i < 20; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Loop through keypoints and draw circles
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // Color-code based on left or right hand
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }
      }
    }
  }
}
