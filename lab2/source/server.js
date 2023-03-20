const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let videoQuery = req.query.videoFile;
    let audioQuery = req.query.audioFile;
    let imgQuery = req.query.imgFile;
    let imgString = ` <img id="posterImage" src="${imgQuery}" /> `;
    let outputString = `<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    <audio id="audioPlayer" controls src=${audioQuery}></audio> `
    if(imgQuery){
        outputString += imgString;
    }
    res.send(outputString);
})

app.listen(4080)
