const crypto = require('crypto');
const nodemailer = require('nodemailer');
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config");
const fileUpload = require('express-fileupload');
const https = require('https');
const fs = require('fs');
//
app.use(cors());
app.use(express.json());
app.use(fileUpload());


//ADD USER
app.post("/adduser", (req, res) => {
  const hoten = req.body.hoten;
  const diachi = req.body.diachi;
  const sodienthoai = req.body.sodienthoai;
  const benhly = req.body.benhly;
  const ghichu = req.body.ghichu;
  const id_nguoigioithieu = req.body.id_nguoigioithieu;
  db.query(
    "SELECT * FROM khachhang WHERE sodienthoai = ?",
    [sodienthoai],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send('found')
        } else {
          db.query(
            "SELECT * FROM khachhang WHERE id_khachhang = ?",
            [id_nguoigioithieu],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                const newSavePoint = result[0].diemtichluy + 1
                const prPoint = result[0].nguoigioithieu + 1
                db.query(
                  "UPDATE khachhang SET diemtichluy = ? where id_khachhang = ? ",
                  [newSavePoint, id_nguoigioithieu],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                db.query(
                  "UPDATE khachhang SET nguoigioithieu = ? where id_khachhang = ? ",
                  [prPoint, id_nguoigioithieu],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          );
          db.query(
            "INSERT INTO khachhang (hoten, diachi, sodienthoai, benhly, ghichu, diemtichluy, nguoigioithieu) VALUES (?,?,?,?,?,?,?)",
            [hoten, diachi, sodienthoai, benhly, ghichu, 0, 0],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send('success')
              }
            }
          );
        }
      }
    }
  );
});

function filterUser(x) {
  const userList = x;
  var newUserList = [];
  userList.forEach(ele => {
    let checkExist = false;
    for (let i = 0; i < newUserList.length; i++) {
      if (newUserList[i].id_khachhang === ele.id_khachhang) {
        let newHistory = { id_khachhang: ele.id_khachhang, id_donhang: ele.id_donhang, diemtichluy: ele.diemtichluy, tendichvu: ele.tendichvu, madichvu: ele.madichvu, solandieutri: ele.solandieutri, solandadieutri: ele.solandadieutri }
        newUserList[i].historyList.push(newHistory);
        checkExist = true;
        break;
      }
    }
    if (!checkExist) {
      let historyList = [{ id_khachhang: ele.id_khachhang, id_donhang: ele.id_donhang, diemtichluy: ele.diemtichluy, tendichvu: ele.tendichvu, madichvu: ele.madichvu, solandieutri: ele.solandieutri, solandadieutri: ele.solandadieutri }]
      delete ele.tendichvu;
      delete ele.madichvu;
      delete ele.solandieutri;
      delete ele.solandadieutri;
      delete ele.id_donhang;
      ele.historyList = historyList;
      newUserList.push(ele);
    }
  });
  return newUserList
}
//GET USER
app.get("/user", (req, res) => {
  db.query("select a.*,b.id_donhang,b.id_dichvu,b.solandadieutri,c.* from khachhang a left join donhang b on a.id_khachhang = b.id_khachhang  left join dichvu c on b.id_dichvu = c.id_dichvu ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(filterUser(result));
    }
  });
});

//ADD SERVICE
app.post("/addservices", (req, res) => {
  const tendv = req.body.tendv;
  const trangthai = req.body.trangthai;
  const madv = req.body.madv.toUpperCase();
  const giadv = req.body.giadv;
  const solandieutri = req.body.solandieutri;
  const giatichluy = req.body.giatichluy;
  db.query(
    "Select * from dichvu",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.tendichvu.toUpperCase() === tendv.toUpperCase() || item.madichvu.toUpperCase() === madv)
        if (check === true) {
          res.send('found')
        } else {
          db.query(
            "INSERT INTO dichvu (tendichvu, trangthai, madichvu, giatien, solandieutri, giatichluy) VALUES (?,?,?,?,?,?)",
            [tendv, trangthai, madv, giadv, solandieutri, giatichluy],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        }
      }
    })
})

//GET SERVICES
app.get("/services", (req, res) => {
  db.query("SELECT * FROM dichvu", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET ACTIVE SERVICES
app.get("/activeservices", (req, res) => {
  db.query("SELECT * FROM dichvu where trangthai = 1 ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//CREATE INVOICE
app.post("/createinvoice", (req, res) => {
  const IDKH = req.body.IDKH;
  const IDDV = req.body.IDDV;
  const diemtichluy = req.body.diemtichluy
  if (diemtichluy || diemtichluy === 0) {
    db.query(
      "INSERT INTO donhang (id_dichvu, id_khachhang, solandadieutri) VALUES (?,?,?)",
      [IDDV, IDKH, 0],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(
            "UPDATE khachhang SET diemtichluy = ? where id_khachhang = ?",
            [diemtichluy, IDKH],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send('result');
              }
            }
          );
        }
      }
    );
  } else {
    db.query(
      "INSERT INTO donhang (id_dichvu, id_khachhang, solandadieutri) VALUES (?,?,?)",
      [IDDV, IDKH, 0],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send('result');
        }
      }
    );
  }
})

//GET SERVICES HISTORY
app.get("/serviceshistory", (req, res) => {
  db.query("select hoten,ngaytaikham,tendichvu,solandieutri,tientrinhdieutri from lichsukham a, donhang b, dichvu c, khachhang d where a.id_donhang = b.id_donhang and b.id_dichvu = c.id_dichvu and b.id_khachhang = d.id_khachhang order by ngaytaikham desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//UPDATE DIEU TRI
app.put("/updatedieutri", (req, res) => {
  const id = req.body.id;
  const id_kh = req.body.id_kh;
  const num = req.body.num;
  const storageNum = req.body.storageNum;
  db.query(
    "UPDATE donhang SET solandadieutri = ? WHERE id_donhang = ?",
    [num, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "INSERT INTO lichsukham (id_donhang,tientrinhdieutri) VALUES (?,?)",
          [id, num],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                "UPDATE khachhang set diemtichluy = ? where id_khachhang = ?",
                [storageNum, id_kh],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send("valua inserted")
                  }
                }
              );
            }
          }
        );
      }
    }
  );
})

//UPDATE USER
app.put("/updateuser", (req, res) => {
  const id_kh = req.body.id_khachhang;
  const hoten = req.body.hoten;
  const diachi = req.body.diachi;
  const benhly = req.body.benhly;
  const ghichu = req.body.ghichu;
  db.query(
    "UPDATE khachhang SET hoten = ?, diachi = ?, benhly = ?, ghichu = ? where id_khachhang = ?",
    [hoten, diachi, benhly, ghichu, id_kh],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("update success")
      }
    }
  );
})

//UPDATE SERVICE
app.put("/updateservices", (req, res) => {
  const id_dichvu = req.body.id_dichvu
  const trangthai = req.body.trangthai;
  db.query(
    "UPDATE dichvu SET trangthai = ? where id_dichvu = ? ",
    [trangthai, id_dichvu],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Updated");
      }
    }
  );
})

//DELELE SERVICES
app.delete("/deleteservice/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM dichvu WHERE id_dichvu = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//GET ORDER
app.get("/order", (req, res) => {
  db.query("select hoten,ngaytao,tendichvu,giatien,madichvu from donhang b, dichvu c, khachhang d where b.id_dichvu = c.id_dichvu and b.id_khachhang = d.id_khachhang order by ngaytao desc", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/doanhthu/:year", (req, res) => {
  const year = req.params.year
  db.query("SELECT month(ngaytao) as thang, SUM(giatien) as DoanhThu from donhang a left join dichvu b on a.id_dichvu = b.id_dichvu  where year(ngaytao) = ? group by month(ngaytao)", year, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/tongsoluong/:year", (req, res) => {
  const year = req.params.year
  db.query("SELECT month(ngaytao) as thang, count(id_donhang) as tongsoluong FROM donhang a where year(ngaytao) = ? GROUP BY month(ngaytao)", year, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/userinmonth/:year", (req, res) => {
  const year = req.params.year
  db.query("SELECT month(ngaykham) as thang, count(id_khachhang) as tonguser FROM khachhang where year(ngaykham) = ? GROUP BY month(ngaykham)", year, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.post("/doanhthungay", (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  db.query("select day(ngaytao) as Ngay,sum(giatien) as DoanhThuNgay from donhang a left join dichvu b on a.id_dichvu = b.id_dichvu where month(ngaytao) = ? and year(ngaytao) = ? group by day(ngaytao)", [month, year], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.post("/tongsoluongngay", (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  db.query("SELECT day(ngaytao) as Ngay , count(id_donhang) as TongSoLuong FROM donhang where month(ngaytao) = ? and year(ngaytao) = ? GROUP BY day(ngaytao)", [month, year], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//STATISTIC
app.get("/tongdoanhthu", (req, res) => {
  db.query("SELECT SUM(giatien) as DoanhThu from donhang a left join dichvu b on a.id_dichvu = b.id_dichvu ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//30 days check
app.get("/30days", (req, res) => {
  db.query("select hoten,b.id_khachhang, id_lsk, max(c.ngaytaikham) as ngaytaikham from khachhang a, donhang b, lichsukham c where a.id_khachhang = b.id_khachhang and b.id_donhang = c.id_donhang group by id_khachhang", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//DELELE USER
app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM khachhang WHERE id_khachhang = ?", id, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error');
    } else {
      res.send(result);
    }
  });
});

//Login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = req.body.token
  db.query(
    "select * from quantrivien where username = ? and password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          db.query(
            "UPDATE quantrivien SET token = ? where id_qtv = ?",
            [token, result[0].id_qtv],
            (err, ress) => {
              if (err) {
                console.log(err);
              } else {
                res.send(token);
              }
            }
          );
        } else {
          res.send('fail')
        }
      }
    }
  );
});

//ADMIN CHECK
app.get("/admincheck/:id", (req, res) => {
  const id = req.params.id;
  if (id === "undefined") {
    res.send("false")
  } else {
    db.query(
      "select email,trangthai from quantrivien where token = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            res.send(result)
          } else {
            res.send('false')
          }
        }
      }
    );
  }
});

//GET ACCOUNT 
app.get("/account", (req, res) => {
  db.query(
    "select id_qtv,username,email,role,trangthai,token from quantrivien",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result)
      }
    }
  );
});

//ADD ACCOUNT
app.post("/addaccount", (req, res) => {
  const username = req.body.username;
  const role = req.body.role;
  const email = req.body.email.toLowerCase();
  const trangthai = req.body.trangthai;
  db.query(
    "Select * from quantrivien",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let check = result.some(item => item.email.toLowerCase() === email.toLowerCase() || item.username === username)
        if (check === true) {
          res.send('found')
        } else {
          db.query(
            "INSERT INTO quantrivien (username, email, role, password, trangthai) VALUES (?,?,?,?,?)",
            [username, email, role, "c4ca4238a0b923820dcc509a6f75849b", trangthai],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Values Inserted");
              }
            }
          );
        }
      }
    })
})

//RESET PASSWORD
app.put("/resetpassword", (req, res) => {
  const id_user = req.body.id_user;
  const password = "c4ca4238a0b923820dcc509a6f75849b"
  db.query(
    "UPDATE quantrivien SET password = ? WHERE id_qtv = ?",
    [password, id_user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//EDIT ACCOUNT
app.put("/editaccount", (req, res) => {
  const id_qtv = req.body.id_qtv;
  const trangthai = req.body.trangthai;
  const role = req.body.role;
  db.query(
    "UPDATE quantrivien SET role = ?, trangthai = ? where id_qtv = ? ",
    [role, trangthai, id_qtv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Updated");
      }
    }
  );
})

//ADD ACCOUNT
app.post("/getrole", (req, res) => {
  const token = req.body.token;
  db.query(
    "Select token,role from quantrivien where token = ?",token,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if(result.length > 0){
          res.send(result)
        }else{
          res.send("token not exist")
        }
      }
    })
})

//UPDATE PASSWORD
app.put("/updatepassword", (req, res) => {
  const email = req.body.email;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;
  db.query(
    "SELECT * FROM quantrivien WHERE email = ? ", email, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if(result[0].password !== oldPass) {
          res.send('false')
        } else {
          db.query(
            "UPDATE quantrivien SET password = ? WHERE id_qtv = ?",
            [newPass, result[0].id_qtv],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send('true');
              }
            }
          );
        }
      }
    }
  );
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});