const express = require("express");
const User = require("../../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');
const { auth } = require("../../middleware/auth")

router.use(cookieParser());

router.post(
    "/register",
    async (req, res) => {

        const {userid, loginid, password, nickname, userlevel}  = req.body;
        console.log(loginid);
        console.log(nickname);
        try {
            let user = await User.findOne({ loginid });
            let name = await User.findOne({ nickname });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "ID already exists" }] });
            }
            if (name) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Nickname already exists" }] });
            }

            user = new User ({
                userid, 
                loginid, 
                password, 
                nickname, 
                userlevel,
            });
            await user.save((err, userInfo) => {
                console.log(userInfo);
                if (err) return res.json({success: false})
                return res.status(200).json({
                    success: true
                })
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    });

router.post("/login", async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin","*");
        User.findOne({ loginid: req.body.loginid }, (err, user) => {
            if (!user) {
                return res
                    .status(400)
                    .json({
                    loginSuccess: false,
                    message: "Id doesn't exists"
                })
            }

            //요청된 아이디가 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
            user.comparePassword( req.body.password, (err, isMatch) => {
                if (!isMatch) return res.json({ loginSuccess: false, message: "wrong password" })

                //비밀번호까지 맞으면 토큰 생성
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    console.log("check")
                    //토큰을 저장한다. 어에? <쿠키>에!
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, loginId: user.loginid })
                })
            })
        })
        /*
        let user = await User.findOne({ loginid:req.body.loginid });

        if(!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Id doesn't exists" }] });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Password is not same" }] });
        }
        */


    }catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/auth", auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 말은 authentication이 true라는 말
    res.status(200).json({
        loginid: req.user.loginid,
        nickname: req.user.nickname,
        userlevel: req.user.userlevel
    })
})

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ "userid":req.user.userid },
    {token: ""},
    (err, user) => {
        if (err) return res.json({ success: false, err });
        console.log("logout success");
        return res.status(200).send({
            success: true
        })
    })
});

module.exports = router;