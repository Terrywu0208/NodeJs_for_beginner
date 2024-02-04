const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

// 解析 JSON 格式的請求主體
app.use(express.json());

// 建立 MySQL 連線
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_user'
});

// 連線到 MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ users: results });
    }
  });
});

app.post('/addUser', (req, res) => {
  const newUser = req.body;

  const query = 'INSERT INTO user SET ?';

  connection.query(query, newUser, (err, result) => {
    if (err) {
      console.error('Error adding user to MySQL:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    } else {
      res.json({ success: true, message: 'User added successfully.' });
    }
  });
});

app.get('/products-from-db', (req, res) => {
  connection.query('SELECT * FROM products', (error, results, fields) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// 關閉 MySQL 連線，當應用程式結束時
process.on('exit', () => {
  connection.end();
  console.log('MySQL connection closed');
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
