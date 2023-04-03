const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let videoQuery = req.query.videoFile;
    let audioQuery = req.query.audioFile;
    let imgQuery = req.query.imgFile;

    let htmlHead = `<!DOCTYPE html>
    <html lang="pl">
    <head>
    <meta charset="UTF-8">
    <script>
        let columnIndex = 1;

        function cancelVideo(){
            document.getElementById("videoPlayer").setAttribute("src", "cancel.mp4");
        }

        function cancelAudio(){
            document.getElementById("audioPlayer").setAttribute("src", "cancel.mp3");
        }

        function addVideo(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("videoPlayer").src;
            cell3.innerHTML = "video";
            columnIndex++;
        }

        function addAudio(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("audioPlayer").src;
            cell3.innerHTML = "audio";
            columnIndex++;
        }

        function addImage(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("posterImage").src;
            cell3.innerHTML = "image";
            columnIndex++;
        }


        window.onload = function(){
            let videoCancelBtnVisible = document.getElementById("videoCancel").style.visibility;
            let audioCancelBtnVisible = document.getElementById("audioCancel").style.visibility;
            if(videoCancelBtnVisible === "visible" || videoCancelBtnVisible === ""){
                document.getElementById("videoAdd").style.visibility = "visible";
            }

            if(audioCancelBtnVisible === "visible" || audioCancelBtnVisible === ""){
                document.getElementById("audioAdd").style.visibility = "visible";
            }
        }

    </script>
    </head>`

    let videoCancelButton = ` <button type="button" id="videoCancel" onclick="cancelVideo()"> Cancel Video </button> </br>`;
    let audioCancelButton = ` <button type="button" id="audioCancel" onclick="cancelAudio()"> Cancel Audio </button> </br>`;
    
    let audioAddButton = ` <button type="button" id="audioAdd" onclick="addAudio()" style="visibility:hidden;"> Add Audio </button> </br>`;
    let videoAddButton = ` <button type="button" id="videoAdd" onclick="addVideo()" style="visibility:hidden;"> Add Video </button> </br>`;
    let imageAddButton = ` <button type="button" id="imageAdd" onclick="addImage()" style="visibility:hidden;"> Add Image </button> </br>`;

    let imgString = ` <img id="posterImage" src="${imgQuery}" /> </br> `;
    let outputString = 
        ` <video id="videoPlayer" width="320" height="240" controls src=${videoQuery}></video> ${videoAddButton}</br>
        <audio id="audioPlayer" controls src=${audioQuery}></audio> ${audioAddButton} </br>`

    if(imgQuery){
        outputString += imgString + imageAddButton;
    }

    let table = ` <table id="playlist_table">
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Type</th>
        </tr>
        </table> `

    outputString += videoCancelButton + audioCancelButton;
    outputString += table;
    res.send(htmlHead + outputString + ' </html> ');
})


app.listen(4080)
