// 這是一個nodejs的https伺服器，用於開發環境
// 由於需要用到攝影機，因此一定需要一個https伺服器
// 如果只是vscode的live server，只有http可以用
// 因此自簽憑證，並運行此server來代替
// 使用方法：
// 1. 在根目錄建立cert資料夾，並將key.pem和cert.pem放入
// 2. 在vscode的終端機(terminal)打上 node server.js
// 3. 在瀏覽器中輸入https://<你的本機IP>:4430
// 4. 如果出現憑證錯誤，請選擇詳細資訊，仍然繼續前往，即可進入網頁
// 5. 如果出現網頁，則表示成功

const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

app.use(express.static('.')); // 將根目錄當作網頁根目錄

https.createServer(options, app).listen(4430, () => {
  console.log('HTTPS Server running at https://<你的本機IP>:4430');
});