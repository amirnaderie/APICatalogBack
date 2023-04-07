const config = require("config");
const express = require("express");
const router = express.Router();

router.get("/",async (req, res) => {
  try {
    let menu={};
    db.all(`SELECT * FROM Menu`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      menu.Menu=[...rows];
    });
    
    db.all(`SELECT * FROM subMenu`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      menu.SubMenu=[...rows];
      res.status(200).send(menu); 

    });
   
  } catch (error) {
  
   res.status(error.response.status).send('خطا در واکشی اطلاعات');
  }
});
    

router.post("/", async (req, res) => {
  try {
  db.run(`INSERT INTO Menu(Name) VALUES(?)`, [req.body.menuName], function(err) {
    if (err) {
      res.status(500).send('خطا در ثبت اطلاعات');
      return;
    }
   // get the last insert id
    res.status(200).send({newRowId:this.lastID}); 
  });
} catch (error) {
  
  res.status(error.response.status).send('خطا در ثبت اطلاعات');
 }
});

router.post("/submenu", async (req, res) => {
  try {
  db.run(`INSERT INTO subMenu(parentId,Name) VALUES(?,?)`, [req.body.parentId,req.body.subMenuName], function(err) {
    if (err) {
      res.status(500).send('خطا در ثبت اطلاعات');
      return;
    }
   // get the last insert id
    res.status(200).send({newRowId:this.lastID}); 
  });
} catch (error) {
  
  res.status(error.response.status).send('خطا در ثبت اطلاعات');
 }
});

router.put("/", async (req, res) => {
  try {
  db.run(`update Menu set Name=? where id=?`, [req.body.menuName,req.body.id], function(err) {
    if (err) {
      res.status(500).send('خطا در ثبت اطلاعات');
      return;
    }
    // get the last insert id
    res.status(200).send('ثبت با موفقیت انجام پذیرفت'); 
  });
} catch (error) {
  
  res.status(error.response.status).send('خطا در ثبت اطلاعات');
 }
});

router.put("/submenu", async (req, res) => {
  try {
  db.run(`update subMenu set Name=? where id=?`, [req.body.subMenuName,req.body.id], function(err) {
    if (err) {
      res.status(500).send('خطا در ثبت اطلاعات');
      return;
    }
    // get the last insert id
    res.status(200).send('ثبت با موفقیت انجام پذیرفت'); 
  });
} catch (error) {
  
  res.status(error.response.status).send('خطا در ثبت اطلاعات');
 }
});


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
module.exports = router;
