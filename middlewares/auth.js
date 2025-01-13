const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req, res, next) => {
    const token=req.body.token;

    if(!token){
        res.status(401).json({
            success: false,
            message: "Token missing"
        });
    }

    try{
        const decode=jwt.verify(token, process.env.Secret_Key);
        console.log(decode);
        req.user=decode;
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: error
        });
    }

    next();
}

exports.isEmployee=(req, res, next) => {
    try{
        if(req.user.role !== "employee"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for employees you can not access it"
            })
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}

exports.isAdmin=(req, res, next) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin you can not access it"
            })
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching"
        })
    }
}