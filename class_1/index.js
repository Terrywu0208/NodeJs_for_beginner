// 引入Node.js的http模組
const http = require('http');

// 建立一個HTTP伺服器
const server = http.createServer((req, res) => {
  // 判斷請求的URL路徑
  if (req.url === '/') {
    // 如果是根路徑，回傳200狀態碼和純文字內容類型的回應標頭，然後結束回應
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Home Page\n');
  } else if (req.url === '/about') {
    // 如果是/about路徑，回傳200狀態碼和純文字內容類型的回應標頭，然後結束回應
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('About Page\n');
  } else {
    // 如果請求的URL不是根路徑或/about路徑，回傳404狀態碼和純文字內容類型的回應標頭，然後結束回應
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found\n');
  }
});

// 設定伺服器監聽的埠號
const port = 3000;
// 啟動伺服器，並在伺服器啟動後印出伺服器運行的位置
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
