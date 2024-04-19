// 引入 Express 框架
const express = require('express');
const path = require('path');  // 需要引入 path 模組

// 建立 Express 應用程式實例
const app = express();
// 將views資料夾配置為靜態
app.use(express.static('views'));
// 指定應用程式使用的埠號
const port = 3000;

// 路徑1: 根路由
app.get('/', (req, res) => {
  // 當收到根路由的 GET 請求時，回應一個簡單的文字訊息
  res.send('Hello, Express! This is the root path.');
});

// 路徑2: /about
app.get('/about', (req, res) => {
  // 當收到 /about 路徑的 GET 請求時，回應一個歡迎訊息
  res.send('Welcome to the About page.');
});

// 路徑3: /contact
app.get('/contact', (req, res) => {
  // 當收到 /contact 路徑的 GET 請求時，回應聯絡方式
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));  // 先回應 HTML 檔案
  console.log("asdasddasdsaasddasdasd")
});

// 路徑4: /products
app.get('/products', (req, res) => {
  // 當收到 /products 路徑的 GET 請求時，回應最新產品資訊
  res.send('Check out our latest products.');
});

// 啟動伺服器，監聽指定的埠號
app.listen(port, () => {
  // 當伺服器啟動成功時，在控制台印出相應的訊息
  console.log(`Express app listening at http://localhost:${port}`);
});
