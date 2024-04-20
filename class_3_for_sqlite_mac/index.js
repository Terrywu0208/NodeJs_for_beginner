// 引入必要的模組
const express = require('express');  // 引入 Express 框架
const path = require('path');  // 引入 Node.js 的 path 模組，用於處理檔案路徑
const sqlite3 = require('sqlite3').verbose();  // 引入 SQLite3 模組，用於處理 SQLite 資料庫

// 建立 Express 應用程式實例
const app = express();
const port = 3000;  // 定義伺服器監聽的埠號

// 解析 JSON 格式的請求主體
app.use(express.json());

// 構建數據庫文件的路徑
const dbPath = path.join(__dirname, 'test_user.db');

// 建立 SQLite 連線
const db = new sqlite3.Database(dbPath);

// 處理 GET /user 請求，回傳 user.html 檔案
app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

// 處理 GET /users 請求，從資料庫中擷取所有使用者資料
app.get('/users', (req, res) => {
  db.all('SELECT * FROM user', (err, rows) => {
    if (err) {
      console.error('Error querying SQLite:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log({ users: rows })
      res.json({ users: rows });
    }
  });
});

// 處理 POST /addUser 請求，將新使用者資料新增至資料庫
app.post('/addUser', (req, res) => {
  const newUser = req.body;  // 從請求主體中獲取新使用者資料

  // 定義 SQL 查詢及參數
  const query = 'INSERT INTO user (a, b, c, d) VALUES (?, ?, ?, ?)';
  const values = [newUser.a, newUser.b, newUser.c, newUser.d];

  // 執行 SQL 查詢
  db.run(query, values, function(err) {
    if (err) {
      console.error('Error adding user to SQLite:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    } else {
      res.json({ success: true, message: 'User added successfully.', id: this.lastID });
    }
  });
});

// 監聽應用程式的 exit 事件，在應用程式結束時關閉 SQLite 連線
process.on('exit', () => {
  db.close();  // 關閉 SQLite 連線
  console.log('SQLite connection closed');
});

// 啟動伺服器監聽指定埠號
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
