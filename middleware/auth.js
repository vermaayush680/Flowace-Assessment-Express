const jwt = require('jsonwebtoken');

/* Middleware to verify JWT token */
const verifyToken = async (req,res,next) => {
    try{
        let token = req.header("Authorization");
        // console.log('token',token);

        /* Restricting Unauthorized access */
        if(!token) return res.status(401).json({message:"Access Denied",data:{}});

        if (token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        
        const jwt_secret = process.env.JWT_SECRET;
        // console.log(token,jwt_secret);
        const verified = jwt.verify(token,jwt_secret,"HS256");
        req.user = verified;
        next();
    }catch(error){
        if(error.message) error = error.message;
        return res.status(401).json({message:error || "Authorization failed",data:{}})
    }
}


/* Middleware to generate a new JWT token */
const generateToken = (req, res) => {

    const jwt_secret = process.env.JWT_SECRET;
    let data = process.env.JWT_PAYLOAD;
    const token = jwt.sign(data, jwt_secret);
    console.log(token);
    res.send(token);
}

module.exports = {
    verifyToken,
    generateToken
}