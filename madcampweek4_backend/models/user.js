const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

const userSchema = mongoose.Schema({
    userid:{
        type: Number
    },
    loginid:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 6
    },
    nickname:{
        type: String,
        maxlength: 20,
        trim: true,
        unique: 1
    },
    userlevel:{
        type: Number,
        default: 0
    },
    token : {
         type: String
     },
     tokenexp :{
         type: Number
     }

})

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'userid',
    startAt: 1, //시작
    increment: 1 // 증가
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    // jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    jwt.sign(user._id.toHexString(),'secretToken', 
        function(err, token) {
            if (err) console.log(err);
            else {
                user.token = token;
                console.log("token saved: " + user.token);
                user.save(function (err, user){
                    if(err) return cb(err)
                    cb(null, user);
                })
            }
        })
}

userSchema.pre('save', function( next ) {
    var user = this;

    console.log("pre" + user);

    if (user.isModified('password')) {
        //비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            console.log("saltsalt: " + salt);
            bcrypt.hash( user.password, salt, function(err, hash) {
                if (err) return next(err);
                console.log("hashhash: " + hash);
                user.password = hash
                next()
            })
        }) 
    } else {
        next()
    }
})

userSchema.statics.findByToken = function( token, cb ) {
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        
        console.log("decoded value is: " + decoded);
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = User = mongoose.model("user", userSchema);