const express = require("express");
const router = express.Router();
const db = require("../database.js")


// Sign Up operation
router.post("/reguser", (req, res) => {

    const min = 10;
    const max = 99;
    const randomInteger1 = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    const randomInteger2 = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    const randomInteger3 = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    const randomInteger4 = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    const randomInteger5 = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    const id = randomInteger1 + randomInteger2 + randomInteger3 + randomInteger4 + randomInteger5;
    console.log(id);

    const checkUserSql = "SELECT * FROM users WHERE `email`= ?"
    const checkMail = [req.body.email];

    const regSql = "INSERT INTO users (`id`,`name`,`email`,`phone`,`dob`,`blood_group`,`address`,`password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const regValues = [
        id,
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.dob,
        req.body.group,
        req.body.address,
        req.body.password
    ];
    db.query(checkUserSql, checkMail, (err, result) => {
        if (err) {
            res.send({
                status: false,
                message: "There was an error"
            })
        } else if (result.length > 0) { //check if there is an account with requested email
            res.send({
                status: false,
                message: "There was already an account with this email."
            })
        } else { // If there is no account with requested email
            db.query(regSql, regValues, (err, result) => {//Creates account and saves data to database.
                if (err) {
                    res.send({
                        status: false,
                        message: "There was an error creating your account"
                    })
                }
                res.send({
                    status: true,
                    message: "Account created successfully"
                });
            })
        }
    })
})

// Login operation

router.post("/loguser",(req,res)=>{
    
    const findAccountQuery="SELECT * from users WHERE `email`=? AND `password`=?";
    const requestedDetails=[
        req.body.email,
        req.body.password
    ]
    
    db.query(findAccountQuery,requestedDetails,(err,result)=>{
        if(err){
            res.send({
                status:false,
                message:"There was an server error"
            })
        }else{
            if(result.length==0){
                res.send({
                    status:false,
                    message:"Email or password is incorrect"
                })
            }else{
                res.send({
                    status:true,
                    message:"Loged in successful"
                })
            }
        }
    })
    // console.log("result");

})

module.exports = router