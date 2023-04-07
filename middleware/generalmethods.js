
const { User } = require("../models/user");

const createUser=async (usr)=>{
   // let user = new User(_.pick(usr, ["name", "email", "password","address","tel"]));
    let user = new User({name:usr.name, email:usr.email,password:usr.password,address:usr.address,tel:usr.tel,usergroupid:usr.usergroupid,quota:usr.quota,maxSizeFileToUpload:usr.maxSizeFileToUpload,active:True});
      
    if (user.password)
     { const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password, salt);
     }  
     await user.save();
     return user;
   }
   
const sanitize = (param) => {
    // for mitigating Cross Site Scripting Attack
    const retVal = /^[A-Za-z0-9 -]*$/.test(param);
    return retVal;
  };

module.exports={createUser,sanitize};