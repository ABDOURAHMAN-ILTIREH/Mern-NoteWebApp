const User = require("../model/UserModel")
const jwt = require("jsonwebtoken")



// create a token function
const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET_JWT,{expiresIn: '3d'});

}
// Login user router
const loginUser = async (req, res) => {

    const {email, password} = req.body

    
    try{
        const user = await User.login(email, password);
        // token
        const token = createToken(user._id)
        res.status(200).json({email,token})

    }catch(error) {
        res.status(400).json({error: error.message});
    }
}

// signup user router
const signupUser = async (req, res) => {

    const {email, password} = req.body
    try{
        const user = await User.signup(email, password);
        // token
        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
}