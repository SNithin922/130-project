song = "";
wlx = 0;
wrx = 0;
wly = 0;
wrx = 0;
score_rightwrist = 0;
score_leftwrist = 0;
music2.mp3 = "";
music.mp3 = "";

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("Modle loaded");
}
function gotPoses(results)
{
    if(results.length > 0 )
    {
        console.log(results);
       score_leftwrist = results[0].pose.keypoints[9].score;
       score_rightwrist = results[0].pose.keypoints[10].score;
       console.log("score of left wrist = "+score_leftwrist+"score of right wrist = "+score_rightwrist);
        wrx = results[0].pose.rightWrist.x;
        wly = results[0].pose.leftWrist.y;
        wlx = results[0].pose.leftWrist.x;
        wry = results[0].pose.rightWrist.y;
        console.log("X cordinets of leftwrist =" + wlx + "Y cordinets of leftwrist =" + wly );
        console.log("X cordinets of rightwrist =" + wrx + "Y cordinets of rightwrist =" + wry);
    }
    
}
function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#000000");
    var song_music1 =music2.mp3.isPlaying();
    console.log(song_music1);
    var song_music2 =music.mp3.isPlaying();
    console.log(song_music2);
if(score_leftwrist > 0.2)
{
    circle(wlx,wly,20);
    song_music1.stop();
}
if(song_music1 == false)
{
    song_music1.play()
}
    else
    {
       document.getElementById("h3").innerHTML = "Playing :" + song_music1;
    }


    if(score_rightwrist > 0.2)
    {
        circle(wrx,wry,20);
        song_music2.stop();
    }
    if(song_music2 == false)
    {
        song_music2.play()
    }
        else
        {
           document.getElementById("h3").innerHTML = "Playing :" + song_music2;
        }
}
