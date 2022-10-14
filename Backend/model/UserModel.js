const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator');

const UserSchema = new Schema({
    email :{
       type: String,
       required: true,
       unique: true
    },
    password: {
        type: String,
        required: true
    }
});


// signup hash password
UserSchema.statics.signup = async function(email, password) {
  
    if(!email || !password){
        throw Error("please full fill the emptyFiels")
    }

    if(!validator.isEmail(email)){
        throw Error("Email not existed")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password mush be strong enougth")
    }

    const existing = await this.findOne({email})

    if(existing){
        throw Error("Email already exists")
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
 
    const user = await this.create({email, password : hash})

    return user
}

// login
UserSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error("please full fill the emptyFiels")
    }
    
    const user = await this.findOne({email})

    if(!user){
        throw Error("Email not correct")
    }
 
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error("Password incorrect")
    }
    return user

}



module.exports = mongoose.model("User",UserSchema)