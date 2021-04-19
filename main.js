song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreleftWrist = 0;
scorerightWrist = 0; 


function preload() {
    song1 = loadSound("love_story.mp3");
    song2 = loadSound("everything_I_need.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
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
        
        scoreleftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);
        scorerightWrist =  result[0].pose.keypoints[10].score;
        console.log("scorerightWrist = " + scorerightWrist);

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

    song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();

    fill("#FF0000");
	stroke("#FF0000");

    if(scoreleftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Everything I Need"
		}
	}

    
	if(scorerightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Love Story"
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}




