const express = require("express");
const cors = require("cors");
const app = express();

// * Models
const Users = require("./models/userModel");
console.log(Users, 'users');
//* ovde idu API call
//* idu i middleware
//* req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* */
app.post("/register", async (req, res, next) => {
    try{
        const user =  await Users.findOne({email: req.body.email});
        if(!user){
            const newUser = new Users(req.body);
            console.log(newUser, 'new user');
            try{
                const saveNewUser = await newUser.save();
                console.log(saveNewUser, 'save new user');
            res.status(200).json({
                status: "success",
                message: "User uspesno registrovan"
            });
            }catch(err){
                return res.status(500).json({
                    status: "fail",
                    message: "Nije sacuvan korisnik u bazi"
                });
            }
        }else {
            return res.status(409).json({
                status: "fail",
                message: "Korisnik vec postoji"
            });
        }

    } catch(err){
    return res.status(500).json({
         status: "fail",
         message: "Doslo je do greske"
     });
    }
});
/*Login */
app.post('/login', async (req, res, next) => {

    try{
        const user =  await Users.findOne({email: req.body.email});
        console.log(user, 'user');
        if(user){
            if(user.password === req.body.password){
                return res.status(200).json({
                    status: "success",
                    message: "User uspesno logovan"
                });
            }else{
                return res.status(404).json({
                    status: "fail",
                    message: "Netacni kredenciali"
                });
            }
            }else {
                return res.status(404).json({
                    status: "fail",
                    message: "Korisnik ne postoji"
                });
            }
        }catch(err){
        return res.status(500).json({
            status: "fail",
            message: "Doslo je do greske"
        });
    }
});

module.exports = app;