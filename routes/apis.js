const config = require("config");
const express = require("express");
var path = require("path");
const router = express.Router();

router.get("/",async (req, res) => {
  try {
   
    db.all(`SELECT * FROM API`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).send(rows); 
    });
   
   
  } catch (error) {
  
   res.status(error.response.status).send('خطا در واکشی اطلاعات');
  }
});
    
router.get("/getfile",async (req, res) => {
  try {

    let filePath = path.join(
      "./PostmanFolder/" ,
      `${req.query.filename}.json`
    );
   
    res.download(filePath);
  } catch (error) {
    res.status(error.response.status).send('خطا در دانلود فایل');
    
  }
});
module.exports = router;
