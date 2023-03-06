const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let videoQuery = req.query.videoFile;
    let audioQuery = req.query.audioFile;
    res.send(`<video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video>
    	<audio id="audioPlayer" controls src=${audioQuery}></audio>`);
})

app.listen(4080)
