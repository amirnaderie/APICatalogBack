const config = require("config");
const express = require("express");
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
    

module.exports = router;
