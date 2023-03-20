const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let videoQuery = req.query.videoFile;
    let audioQuery = req.query.audioFile;
    let imgQuery = req.query.imgFile;

    let htmlHead = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <script>
    function cancelVideo(){
        document.getElementById("videoPlayer").setAttribute("src", "cancel.mp4");
    }
    function cancelAudio(){
        document.getElementById("audioPlayer").setAttribute("src", "cancel.mp3");
    }
    </script>
    </head>`

    let videoCancelButton = ` <button type="button" id="videoCancel" onclick="cancelVideo()"> Cancel Video </button> `;
    let audioCancelButton = ` <button type="button" id="audioCancel" onclick="cancelAudio()"> Cancel Audio </button> `;
    let imgString = ` <img id="posterImage" src="${imgQuery}" /> `;
    let outputString = `<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    <audio id="audioPlayer" controls src=${audioQuery}></audio> `
    if(imgQuery){
        outputString += imgString;
    }
    outputString += videoCancelButton + audioCancelButton;
    res.send(htmlHead + outputString + '</html>');
})


app.listen(4080)
