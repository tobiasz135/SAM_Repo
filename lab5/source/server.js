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
    <title>Lab 4</title>
    <script>
        let columnIndex = 1;

        function cancelVideo(){
            document.getElementById("videoPlayer").setAttribute("src", "cancel.mp4");
        }

        function cancelAudio(){
            document.getElementById("audioPlayer").setAttribute("src", "cancel.mp3");
        }

        function moveRowUp(r){
            let i = r.parentNode.parentNode.rowIndex;
            let table = document.getElementById("playlist_table");
            let row = table.rows[i];
            table.deleteRow(i);
            if(i > 1){
                table.insertRow(i - 1).outerHTML = row.outerHTML;
            } else {
                table.insertRow(table.rows.length).outerHTML = row.outerHTML;
            }
            recalculateIndex();
        }

        function moveRowDown(r){
            let i = r.parentNode.parentNode.rowIndex;
            let table = document.getElementById("playlist_table");
            let row = table.rows[i];
            table.deleteRow(i);
            if(i < table.rows.length){
                table.insertRow(i + 1).outerHTML = row.outerHTML;
            } else {
                table.insertRow(1).outerHTML = row.outerHTML;
            }
            recalculateIndex();
        }

        recalculateIndex = function(){
            let table = document.getElementById("playlist_table");
            let rows = table.rows;
            for(let i = 1; i < rows.length; i++){
                rows[i].cells[0].innerHTML = i;
            }
        }

        function deleteRow(r) {
            let i = r.parentNode.parentNode.rowIndex;
            document.getElementById("playlist_table").deleteRow(i);
            columnIndex--;
            recalculateIndex();
        }

        function addVideo(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("videoPlayer").getAttribute("src");
            cell3.innerHTML = "Video";
            cell4.innerHTML = "<button class='removeRowButton' type='button' onclick='deleteRow(this)'>Delete</button>";
            cell4.innerHTML += "<button class='moveRowUpButton' type='button' onclick='moveRowUp(this)'>Up</button>";
            cell4.innerHTML += "<button class='moveRowDownButton' type='button' onclick='moveRowDown(this)'>Down</button>";
            columnIndex++;
        }

        function addAudio(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("audioPlayer").getAttribute("src");
            cell3.innerHTML = "Audio";
            cell4.innerHTML = "<button class='removeRowButton' type='button' onclick='deleteRow(this)'>Delete</button>";
            cell4.innerHTML += "<button class='moveRowUpButton' type='button' onclick='moveRowUp(this)'>Up</button>";
            cell4.innerHTML += "<button class='moveRowDownButton' type='button' onclick='moveRowDown(this)'>Down</button>";
            columnIndex++;
        }

        function addImage(){
            let table = document.getElementById("playlist_table");
            let row = table.insertRow(columnIndex);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = columnIndex;
            cell2.innerHTML = document.getElementById("posterImage").getAttribute("src");
            cell3.innerHTML = "Image";
            cell4.innerHTML = "<button class='removeRowButton' type='button' onclick='deleteRow(this)'>Delete</button>";
            cell4.innerHTML += "<button class='moveRowUpButton' type='button' onclick='moveRowUp(this)'>Up</button>";
            cell4.innerHTML += "<button class='moveRowDownButton' type='button' onclick='moveRowDown(this)'>Down</button>";
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
    let imageAddButton = ` <button type="button" id="imgAdd" onclick="addImage()" style="visibility:hidden;"> Add Image </button> </br>`;

    let imgString = ` <img id="posterImage" src="${imgQuery}" /> </br> `;
    let outputString = 
        ` <video id="videoPlayer" width="320" height="240" controls src=${videoQuery} ${videoQuery ? "" : "hidden"}></video> ${videoAddButton}</br>
        <audio id="audioPlayer" controls src=${audioQuery} ${audioQuery ? "" : "hidden"}></audio> ${audioAddButton} </br>`

    if(imgQuery){
        outputString += imgString + imageAddButton;
    }

    let table = ` <table id="playlist_table">
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Type</th>
            <th>Action</th>
        </tr>
        </table> `

    outputString += videoCancelButton + audioCancelButton;
    outputString += table;
    res.send(htmlHead + outputString + ' </html> ');
})


app.listen(4080)
