const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const token = req.header("auth")?.replace("Bearer ", "")
        if(!token){
           return res.status(400).json({msg:"Token ausente"})
            
        }
        const verify = jwt.verify(token, process.env.SECRET_KEY)
       if(verify ){
        next()
       }else {
        res.status(401).json({msg: "No estas autorizado"})
       }
    } catch (error) {
        res.status(500).json({mensaje:"Server error",error})
    }
} 

module.exports= {auth}