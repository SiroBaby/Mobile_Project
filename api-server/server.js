const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kết nối đến cơ sở dữ liệu SQLite (lưu trữ trong file database.db)
let db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Bật hỗ trợ khóa ngoại
db.run('PRAGMA foreign_keys = ON;');

// Tạo các bảng theo đặc tả hệ thống, chỉ tạo nếu chưa tồn tại
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS SinhVien (
    MSSV TEXT PRIMARY KEY,
    Ten TEXT,
    NgaySinh DATE,
    GioiTinh Text,
    CCCD Text,
    DanToc Text,
    QueQuan Text,
    Email TEXT,
    SoDienThoai TEXT,
    MaNganh TEXT,
    Img TEXT,
    Address TEXT,
    FOREIGN KEY (MaNganh) REFERENCES NganhHoc(MaNganh)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS LopHoc (
    MaLop TEXT PRIMARY KEY,
    TenLop TEXT,
    SoLuongSV INTEGER,
    ID TEXT,
    FOREIGN KEY (ID) REFERENCES User(ID)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS MonHoc (
    MaMonHoc TEXT PRIMARY KEY,
    TenMonHoc TEXT,
    SoTinChi INTEGER
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS Diem (
    MSSV TEXT,
    MaMonHoc TEXT,
    Diem1 REAL,
    Diem2 REAL,
    Diem3 REAL,
    DiemGK REAL,
    DiemCK REAL,
    PRIMARY KEY (MSSV, MaMonHoc),
    FOREIGN KEY (MSSV) REFERENCES SinhVien(MSSV),
    FOREIGN KEY (MaMonHoc) REFERENCES MonHoc(MaMonHoc)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS PhienDiemDanh (
    MaPhien TEXT PRIMARY KEY,
    MSSV TEXT,
    MaLop TEXT,
    ThoiGian TEXT,
    DaDiemDanh BOOLEAN,
    FOREIGN KEY (MSSV) REFERENCES SinhVien(MSSV),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS User (
    ID TEXT PRIMARY KEY,
    HoVaTen TEXT,
    TenDangNhap TEXT,
    MatKhau TEXT,
    SDT INT,
    Email TEXT,
    Quyen INTEGER DEFAULT 0
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS NganhHoc (
    MaNganh TEXT PRIMARY KEY,
    TenNganh TEXT,
    SoLuongSV INTEGER
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS NganhMonHoc (
    MaNganh TEXT,
    MaMonHoc TEXT,
    PRIMARY KEY (MaNganh, MaMonHoc),
    FOREIGN KEY (MaNganh) REFERENCES NganhHoc(MaNganh),
    FOREIGN KEY (MaMonHoc) REFERENCES MonHoc(MaMonHoc)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS SinhVienLopHoc (
    MSSV TEXT,
    MaLop TEXT,
    PRIMARY KEY (MSSV, MaLop),
    FOREIGN KEY (MSSV) REFERENCES SinhVien(MSSV),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop)
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS LopMonHoc (
    MaLop TEXT,
    MaMonHoc TEXT,
    PRIMARY KEY (MaLop, MaMonHoc),
    FOREIGN KEY (MaMonHoc) REFERENCES MonHoc(MaMonHoc),
    FOREIGN KEY (MaLop) REFERENCES LopHoc(MaLop)
  )`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM User WHERE TenDangNhap = ? AND MatKhau = ?', [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(200).json({ message: 'Login successful', user: row });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

app.post('/signup', (req, res) => {
    const { fullName, username, email, phoneNumber, password } = req.body;
    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    db.get('SELECT * FROM User WHERE TenDangNhap = ?', [username], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            // Thêm người dùng mới vào cơ sở dữ liệu
            db.run('INSERT INTO User (HoVaTen, TenDangNhap, MatKhau, SDT, Email) VALUES (?, ?, ?, ?, ?)', [fullName, username, password, phoneNumber, email], (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(201).json({ message: 'Signup successful' });
            });
        }
    });
});

// Route thêm mới sinh viên
app.post('/addnew', (req, res) => {
    const { mssv, name, ngaysinh, gioitinh, cccd, dantoc, quequan, email, sdt, nganhhoc, diachi } = req.body;

    const sql = `INSERT INTO SinhVien (MSSV, Ten, NgaySinh, GioiTinh, CCCD, DanToc, QueQuan, Email, SoDienThoai, MaNganh, Address)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [mssv, name, ngaysinh, gioitinh, cccd, dantoc, quequan, email, sdt, nganhhoc, diachi], function(err) {
        if (err) {
            res.status(500).json({ error: 'Thêm mới sinh viên thất bại' });
            return;
        }
        res.status(200).json({ message: 'Thêm mới sinh viên thành công' });
    });
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});