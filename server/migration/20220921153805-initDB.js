/* eslint-disable @typescript-eslint/prefer-for-of */

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
  SET time_zone = "+07:00";
  
  CREATE TABLE dichvu (
    id_dichvu int(11) NOT NULL,
    tendichvu varchar(200) NOT NULL,
    giatien float NOT NULL,
    solandieutri int(3) NOT NULL,
    trangthai tinyint(1) NOT NULL,
    madichvu varchar(10) DEFAULT NULL,
    giatichluy int(3) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  
  INSERT INTO dichvu (id_dichvu, tendichvu, giatien, solandieutri, trangthai, madichvu, giatichluy) VALUES
  (2, 'Xoa Bóp Trị Liệu', 55555, 6, 1, 'XB01', NULL),
  (3, 'Nằm Không Ăn Tiền', 60000, 5, 1, 'NK01', NULL),
  (4, 'abc', 55555, 7, 1, 'ABC01', NULL),
  (6, 'test điểm thương', 1, 5, 1, 'DT01', 5);
  
  
  CREATE TABLE donhang (
    id_donhang int(11) NOT NULL,
    id_khachhang int(11) NOT NULL,
    ngaytao timestamp NULL DEFAULT current_timestamp(),
    id_dichvu int(11) DEFAULT NULL,
    solandadieutri int(3) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  
  
  INSERT INTO donhang (id_donhang, id_khachhang, ngaytao, id_dichvu, solandadieutri) VALUES
  (4, 3, '2021-06-21 15:49:02', 2, 6),
  (5, 2, '2021-06-21 16:09:33', 2, 5),
  (6, 4, '2021-06-21 16:09:38', 2, 3),
  (7, 2, '2021-06-22 03:52:46', 3, 4),
  (8, 4, '2021-05-22 03:52:51', 3, 0),
  (9, 5, '2021-05-22 04:34:45', 2, 3),
  (10, 9, '2021-06-22 11:44:42', 2, 2),
  (11, 9, '2021-06-22 11:48:08', 2, 4),
  (12, 9, '2021-06-22 12:44:52', 4, 3),
  (13, 9, '2021-06-22 12:53:16', 4, 0),
  (14, 11, '2021-06-23 05:01:10', 2, 5),
  (15, 10, '2021-06-23 05:24:33', 3, 4),
  (16, 8, '2021-06-23 05:30:31', 2, 0),
  (17, 6, '2021-06-23 05:32:40', 2, 0),
  (18, 6, '2021-06-23 05:32:53', 3, 0),
  (19, 11, '2021-06-23 05:33:27', 3, 0),
  (20, 11, '2021-06-24 10:57:17', 6, 0),
  (21, 9, '2021-06-24 10:59:50', 6, 0),
  (22, 11, '2021-06-24 11:00:17', 6, 0),
  (23, 10, '2021-06-24 11:02:37', 2, 3),
  (24, 10, '2021-06-24 11:02:48', 6, 3),
  (25, 10, '2021-06-24 11:03:07', 6, 0),
  (26, 10, '2021-06-24 11:04:46', 6, 0),
  (27, 11, '2021-06-24 11:04:52', 6, 0),
  (28, 7, '2021-06-24 11:05:47', 2, 2),
  (29, 12, '2021-06-24 11:24:05', 2, 6),
  (30, 12, '2021-06-24 11:25:04', 3, 5),
  (31, 12, '2021-06-24 11:25:13', 3, 5),
  (32, 12, '2021-06-24 11:27:21', 4, 7),
  (33, 12, '2021-06-24 11:28:46', 4, 7),
  (34, 12, '2021-06-24 11:37:17', 6, 0),
  (35, 12, '2021-06-24 11:38:07', 4, 7),
  (36, 12, '2021-06-24 11:59:15', 6, 0),
  (37, 12, '2021-06-24 12:14:49', 6, 0);
  
  
  
  CREATE TABLE khachhang (
    id_khachhang int(11) NOT NULL,
    hoten varchar(50) NOT NULL,
    diachi varchar(50) NOT NULL,
    sodienthoai varchar(20) NOT NULL,
    benhly varchar(500) NOT NULL,
    ghichu varchar(500) NOT NULL,
    ngaykham timestamp NULL DEFAULT current_timestamp(),
    diemtichluy int(2) DEFAULT NULL,
    nguoigioithieu int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  INSERT INTO khachhang (id_khachhang, hoten, diachi, sodienthoai, benhly, ghichu, ngaykham, diemtichluy, nguoigioithieu) VALUES
  (2, 'Trần Hà Nam', '74 NTHHH', '793966348', 'abc', 'abc', '2021-06-10 09:23:40', 5, 1),
  (3, 'Trần Trung Hiếu', 'dsaas', 'dsadsa', 'dsadsa', 'dsadsa', '2021-06-19 04:58:34', 3, 0),
  (4, 'Trần Thiện', '321321', '321321', '321321', '321321', '2021-06-19 04:58:34', 2, 0),
  (5, 'Minh Trầm', 'dsa', 'zzcx', 'dsadsa', 'dsadsa', '2021-05-19 04:58:34', 1, 0),
  (6, 'Trần Quốc Thanh', '74 NTH', '793966347', 'dsad', 'dsadsa', '2021-06-19 05:02:58', 0, 0),
  (7, 'Nam 2 ', '74 NTH', '793966346', 'dsad', 'dsadsa', '2021-06-19 05:33:59', 2, 0),
  (8, 'Nam 3', '74 NTH', '793966345', 'dsad', 'dsadsa', '2021-06-19 05:35:02', 0, 0),
  (9, 'Lép óc chó', 'Abc', '378101520', 'Xyz', 'Từ a đến z', '2021-06-22 05:44:55', 2, 0),
  (10, 'gfdgfdgfd', '74 NTH', '5454454554', 'dsad', 'dsadsa', '2021-06-22 12:16:34', 0, 0),
  (11, 'Chí Phèo', '74 NTH', '123456789', 'dsad', 'dsadsa', '2021-06-22 12:52:22', 0, 0),
  (12, 'Nguyễn Thành Công', 'Palm garden', '932537795', 'Cột sống cổ', 'Chưa thanh toán', '2021-06-24 11:23:26', 17, 0),
  (13, 'gia vĩnh khang', 'ád', '123456780', 'aaaaaaa', 'aaaa', '2021-06-24 12:37:29', 0, 0);
  
  
  
  CREATE TABLE lichsukham (
    id_lsk int(11) NOT NULL,
    id_donhang int(11) NOT NULL,
    ngaytaikham timestamp NULL DEFAULT current_timestamp(),
    tientrinhdieutri int(2) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  
  INSERT INTO lichsukham (id_lsk, id_donhang, ngaytaikham, tientrinhdieutri) VALUES
  (3, 4, '2021-06-21 15:49:02', NULL),
  (4, 5, '2021-06-21 16:09:33', NULL),
  (5, 6, '2021-06-21 16:09:38', NULL),
  (6, 7, '2021-06-22 03:52:46', NULL),
  (7, 8, '2021-06-22 03:52:51', NULL),
  (8, 9, '2021-06-22 04:34:45', NULL),
  (9, 5, '2021-06-22 06:12:30', NULL),
  (10, 5, '2021-06-22 06:17:03', NULL),
  (11, 5, '2021-06-22 06:17:48', NULL),
  (12, 5, '2021-06-22 06:18:03', NULL),
  (13, 5, '2021-06-22 06:18:37', NULL),
  (14, 5, '2021-06-22 06:19:59', NULL),
  (15, 7, '2021-06-22 06:20:06', NULL),
  (16, 7, '2021-06-22 06:20:53', NULL),
  (17, 7, '2021-06-22 06:28:04', NULL),
  (18, 7, '2021-06-22 06:28:28', NULL),
  (19, 4, '2021-06-22 06:41:57', NULL),
  (20, 6, '2021-06-22 06:43:42', NULL),
  (21, 10, '2021-06-22 11:44:42', NULL),
  (22, 11, '2021-06-22 11:48:08', NULL),
  (23, 4, '2021-06-22 12:21:16', NULL),
  (24, 4, '2021-06-22 12:21:26', NULL),
  (25, 9, '2021-06-22 12:21:36', NULL),
  (26, 9, '2021-06-22 12:21:39', NULL),
  (27, 9, '2021-06-22 12:21:45', NULL),
  (28, 10, '2021-06-22 12:28:56', NULL),
  (29, 10, '2021-06-22 12:29:00', NULL),
  (30, 6, '2021-06-22 12:34:57', NULL),
  (31, 6, '2021-06-22 12:37:17', NULL),
  (32, 11, '2021-06-22 12:42:58', NULL),
  (33, 11, '2021-06-22 12:43:00', NULL),
  (34, 11, '2021-06-22 12:43:02', NULL),
  (35, 11, '2021-06-22 12:43:03', NULL),
  (36, 12, '2021-06-22 12:44:52', NULL),
  (37, 12, '2021-06-22 12:53:43', NULL),
  (38, 12, '2021-06-22 12:53:46', NULL),
  (39, 14, '2021-06-23 05:02:06', NULL),
  (40, 14, '2021-06-23 05:02:14', NULL),
  (41, 14, '2021-06-23 05:24:09', 3),
  (42, 14, '2021-06-23 05:24:11', 4),
  (43, 14, '2021-06-23 05:24:13', 5),
  (44, 15, '2021-04-23 05:24:39', 1),
  (45, 15, '2021-05-23 05:24:43', 2),
  (46, 15, '2021-06-24 11:02:29', 3),
  (47, 15, '2021-06-24 11:02:32', 4),
  (48, 23, '2021-06-24 11:02:40', 1),
  (49, 23, '2021-06-24 11:02:41', 2),
  (50, 23, '2021-06-24 11:02:42', 3),
  (51, 24, '2021-06-24 11:03:02', 1),
  (52, 24, '2021-06-24 11:03:03', 2),
  (53, 24, '2021-06-24 11:03:04', 3),
  (54, 28, '2021-05-24 11:06:09', 1),
  (55, 29, '2021-06-24 11:24:16', 1),
  (56, 29, '2021-06-24 11:24:18', 2),
  (57, 29, '2021-06-24 11:24:20', 3),
  (58, 29, '2021-06-24 11:24:22', 4),
  (59, 29, '2021-06-24 11:24:24', 5),
  (60, 29, '2021-06-24 11:24:25', 6),
  (61, 30, '2021-06-24 11:25:51', 1),
  (62, 30, '2021-06-24 11:25:52', 2),
  (63, 30, '2021-06-24 11:25:54', 3),
  (64, 30, '2021-06-24 11:25:55', 4),
  (65, 30, '2021-06-24 11:25:57', 5),
  (66, 31, '2021-06-24 11:26:05', 1),
  (67, 31, '2021-06-24 11:26:07', 2),
  (68, 31, '2021-06-24 11:26:08', 3),
  (69, 31, '2021-06-24 11:26:10', 4),
  (70, 31, '2021-06-24 11:26:11', 5),
  (71, 32, '2021-06-24 11:27:40', 1),
  (72, 32, '2021-06-24 11:27:42', 2),
  (73, 32, '2021-06-24 11:27:44', 3),
  (74, 32, '2021-06-24 11:27:46', 4),
  (75, 32, '2021-06-24 11:27:47', 5),
  (76, 32, '2021-06-24 11:27:48', 6),
  (77, 32, '2021-06-24 11:27:53', 7),
  (78, 33, '2021-06-24 11:29:09', 1),
  (79, 33, '2021-06-24 11:29:10', 2),
  (80, 33, '2021-06-24 11:29:11', 3),
  (81, 33, '2021-06-24 11:29:12', 4),
  (82, 33, '2021-06-24 11:29:13', 5),
  (83, 33, '2021-06-24 11:29:15', 6),
  (84, 33, '2021-06-24 11:29:16', 7),
  (85, 35, '2021-06-24 11:38:11', 1),
  (86, 35, '2021-06-24 11:38:12', 2),
  (87, 35, '2021-06-24 11:38:13', 3),
  (88, 35, '2021-06-24 11:38:14', 4),
  (89, 35, '2021-06-24 11:38:15', 5),
  (90, 35, '2021-06-24 11:38:15', 6),
  (91, 35, '2021-06-24 11:38:16', 7),
  (92, 28, '2021-06-24 12:49:44', 2);
  
  
  
  CREATE TABLE quantrivien (
    id_qtv int(11) NOT NULL,
    username varchar(20) NOT NULL,
    password varchar(100) NOT NULL,
    role varchar(20) NOT NULL,
    token varchar(100) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    trangthai tinyint(1) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  
  
  
  INSERT INTO quantrivien (id_qtv, username, password, role, token, email, trangthai) VALUES
  (1, 'drsol', '25f9e794323b453885f5181f1b624d0b', 'admin', 'f79ad1785525697d93e14e3cf187fb3454b4333f', 'drsol@gmail.com', 1),
  (2, 'mrlep', '687bb51c59d93a86004e5d64b4d944c9', 'user', 'd530f3d8478f97c5f876da0e5a3e41c35cde4fcf', 'phepthuat301@gmail.com', 1);
  
  
  ALTER TABLE dichvu
    ADD PRIMARY KEY (id_dichvu);
  
  ALTER TABLE donhang
    ADD PRIMARY KEY (id_donhang),
    ADD KEY donhang-khachhang (id_khachhang),
    ADD KEY donhang-dichvu (id_dichvu);
  
  ALTER TABLE khachhang
    ADD PRIMARY KEY (id_khachhang);
  
  ALTER TABLE lichsukham
    ADD PRIMARY KEY (id_lsk),
    ADD KEY lsk-donhang (id_donhang);
  
  
  ALTER TABLE quantrivien
    ADD PRIMARY KEY (id_qtv);
  
  
  ALTER TABLE dichvu
    MODIFY id_dichvu int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
  
  
  ALTER TABLE donhang
    MODIFY id_donhang int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
  
  ALTER TABLE khachhang
    MODIFY id_khachhang int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
  
  
  ALTER TABLE lichsukham
    MODIFY id_lsk int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
  
  ALTER TABLE quantrivien
    MODIFY id_qtv int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
  
  
  ALTER TABLE donhang
    ADD CONSTRAINT donhang-dichvu FOREIGN KEY (id_dichvu) REFERENCES dichvu (id_dichvu),
    ADD CONSTRAINT donhang-khachhang FOREIGN KEY (id_khachhang) REFERENCES khachhang (id_khachhang);
  
  
  ALTER TABLE lichsukham
    ADD CONSTRAINT lsk-donhang FOREIGN KEY (id_donhang) REFERENCES donhang (id_donhang);
  COMMIT;`
  )
};

exports.down = function (db) {
  return db.runSql(`
  DROP DATABASE thclinic;
  CREATE DATABASE thclinic;
  `
  )
};

exports._meta = {
  "version": 1
};
