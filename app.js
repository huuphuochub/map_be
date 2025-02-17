// Import thư viện cần thiết
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Tạo ứng dụng Express
const app = express();

// Sử dụng CORS và JSON middleware
app.use(cors({
  origin: '*', // Hoặc chỉ định URL cụ thể nếu cần
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));app.use(express.json());

// Định nghĩa một route cơ bản


// Lắng nghe kết nối trên một port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
mongoose.connect('mongodb://localhost:27017/yes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



const userrouter = require('./router/user')



app.use('/user',userrouter);