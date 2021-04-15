song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
	song1 = loadSound("everything_I_need.mp3");
	song2 = loadSound("love_story.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {

    console.log('PoseNet Is Initialized');
}

function gotPoses(result) {

    if (result.length > 0) {

        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {

	image(video, 0, 0, 600, 500);
}
