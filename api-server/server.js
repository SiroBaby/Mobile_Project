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
    Diem1 REAL DEFAULT 0,
    Diem2 REAL DEFAULT 0,
    DiemGK REAL DEFAULT 0,
    DiemCK REAL DEFAULT 0,
    PRIMARY KEY (MSSV, MaMonHoc),
    FOREIGN KEY (MSSV) REFERENCES SinhVien(MSSV),
    FOREIGN KEY (MaMonHoc) REFERENCES MonHoc(MaMonHoc)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS PhienDiemDanh (
    MaPhien TEXT PRIMARY KEY,
    MSSV TEXT,
    MaMonHoc TEXT,
    Dd1 BOOLEAN,
    Dd2 BOOLEAN,
    Dd3 BOOLEAN,
    Dd4 BOOLEAN,
    Dd5 BOOLEAN,
    FOREIGN KEY (MSSV) REFERENCES SinhVien(MSSV),
    FOREIGN KEY (MaMonHoc) REFERENCES MonHoc(MaMonHoc)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS User (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
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

  // Chạy truy vấn SQL để lấy thông tin user, bao gồm MaLop và MaMonHoc
  const query = `
    SELECT User.*, LopMonHoc.MaLop, LopMonHoc.MaMonHoc FROM User JOIN LopHoc ON USER.ID = LopHoc.ID JOIN LopMonHoc ON LopHoc.MaLop = LopMonHoc.MaLop WHERE USER.TenDangNhap = ? AND USER.MatKhau = ?;
  `;

  db.get(query, [username, password], (err, row) => {
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

// API đổi mật khẩu
app.post('/changepassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  const selectQuery = 'SELECT * FROM User WHERE TenDangNhap = ? AND MatKhau = ?';
  const updateQuery = 'UPDATE User SET MatKhau = ? WHERE TenDangNhap = ?';

  db.get(selectQuery, [username, oldPassword], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(400).json({ message: 'Sai mật khẩu cũ' });
      return;
    }
    db.run(updateQuery, [newPassword, username], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    });
  });
});

//Api thêm mới sinh viên
app.post('/addnew', (req, res) => {
  const { mssv, name, ngaysinh, gioitinh, cccd, dantoc, quequan, email, sdt, nganhhoc, diachi } = req.body;

  const sql = `INSERT INTO SinhVien (MSSV, Ten, NgaySinh, GioiTinh, CCCD, DanToc, QueQuan, Email, SoDienThoai, MaNganh, Address)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [mssv, name, ngaysinh, gioitinh, cccd, dantoc, quequan, email, sdt, nganhhoc, diachi], function (err) {
    if (err) {
      res.status(500).json({ error: 'Thêm mới sinh viên thất bại' });
      return;
    }
    res.status(200).json({ message: 'Thêm mới sinh viên thành công' });
  });
});

//Api lấy danh sách toàn bộ sinh viên
app.get('/getstudents', (req, res) => {
  const sql = `
    SELECT 
      MSSV, 
      Ten
    FROM 
      SinhVien 
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

// API lấy thông tin sinh viên theo MSSV
app.get('/getstudent/:studentId', (req, res) => {
  const { studentId } = req.params;
  const sql = `SELECT * FROM SinhVien WHERE MSSV = ?`;

  db.get(sql, [studentId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(row);
  });
});

// API cập nhật thông tin sinh viên
app.put('/updatestudent/:studentId', (req, res) => {
  const { studentId } = req.params;
  const { name, cccd, dob, gender, ethnicity, address, hometown, email, phone, major } = req.body;

  const sql = `
    UPDATE SinhVien
    SET Ten = ?, CCCD = ?, NgaySinh = ?, GioiTinh = ?, DanToc = ?, Address = ?, QueQuan = ?, Email = ?, SoDienThoai = ?, MaNganh = ?
    WHERE MSSV = ?
  `;

  db.run(sql, [name, cccd, dob, gender, ethnicity, address, hometown, email, phone, major, studentId], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Cập nhật thông tin sinh viên thành công' });
  });
});

// API xóa sinh viên theo MSSV
app.delete('/deletestudent/:studentId', (req, res) => {
  const { studentId } = req.params;

  // Xóa các bản ghi phụ thuộc trước
  const deleteDependentRecords = (table, column) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${table} WHERE ${column} = ?`;
      db.run(sql, [studentId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };

  // Xóa sinh viên
  const deleteStudent = () => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM SinhVien WHERE MSSV = ?`;
      db.run(sql, [studentId], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  };

  // Thực hiện xóa các bản ghi phụ thuộc và sau đó xóa sinh viên
  const deleteOperations = async () => {
    try {
      await deleteDependentRecords('Diem', 'MSSV');
      await deleteDependentRecords('PhienDiemDanh', 'MSSV');
      await deleteDependentRecords('SinhVienLopHoc', 'MSSV');
      await deleteStudent();
      res.status(200).json({ message: 'Xóa sinh viên thành công' });
    } catch (err) {
      console.error('Error deleting student:', err); // Thêm chi tiết lỗi vào log
      res.status(500).send(err);
    }
  };

  deleteOperations();
});

// Api lấy danh sách sinh viên theo môn học
app.get('/students/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId;
  const sql = `
      SELECT 
          SinhVien.MSSV, 
          SinhVien.Ten, 
          Diem.Diem1, 
          Diem.Diem2, 
          Diem.DiemGK, 
          Diem.DiemCK 
      FROM 
          SinhVien
      JOIN 
          Diem ON SinhVien.MSSV = Diem.MSSV
      WHERE 
          Diem.MaMonHoc = ?
  `;
  db.all(sql, [subjectId], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.status(200).json(rows);
  });
});

// Api cập nhật điểm sinh viên
app.post('/students/:subjectId/update-scores', (req, res) => {
  const subjectId = req.params.subjectId;
  const { mssv, score1, score2, scoreGK, scoreCK } = req.body;

  const sql = `
      UPDATE Diem 
      SET 
          Diem1 = ?, 
          Diem2 = ?, 
          DiemGK = ?, 
          DiemCK = ? 
      WHERE 
          MSSV = ? 
          AND MaMonHoc = ?
  `;
  db.run(sql, [score1, score2, scoreGK, scoreCK, mssv, subjectId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Cập nhật điểm thành công' });
    console.log(score1, score2, scoreGK, scoreCK, mssv, subjectId);
  });
});

// API lấy danh sách điểm danh
app.get('/attendance/:subjectId', (req, res) => {
  const subjectId = req.params.subjectId;
  const sql = `
    SELECT 
      PhienDiemDanh.MSSV,  
      SinhVien.Ten, 
      PhienDiemDanh.Dd1, 
      PhienDiemDanh.Dd2, 
      PhienDiemDanh.Dd3, 
      PhienDiemDanh.Dd4, 
      PhienDiemDanh.Dd5 
    FROM 
      PhienDiemDanh
    JOIN 
      SinhVien ON PhienDiemDanh.MSSV = SinhVien.MSSV
    WHERE 
      PhienDiemDanh.MaMonHoc = ?
  `;
  db.all(sql, [subjectId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

// API cập nhật trạng thái điểm danh
app.post('/attendance/:subjectId/update', (req, res) => {
  const subjectId = req.params.subjectId;
  const { mssv, dd1, dd2, dd3, dd4, dd5 } = req.body;

  const sql = `
    UPDATE PhienDiemDanh 
    SET 
      Dd1 = ?, 
      Dd2 = ?, 
      Dd3 = ?, 
      Dd4 = ?, 
      Dd5 = ?
    WHERE 
      MSSV = ? 
      AND MaMonHoc = ?
  `;
  db.run(sql, [dd1, dd2, dd3, dd4, dd5, mssv, subjectId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: 'Cập nhật điểm danh thành công' });
  });
});


// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});