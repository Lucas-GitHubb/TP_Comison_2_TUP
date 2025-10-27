const bcrypts = require("bcryptjs")

const hashPass = async (pass) =>{
    let salt = await bcrypts.genSalt(10);
    return await bcrypts.hash(pass, salt);
}

const comparePass = async (pass, hashedPass)=>{
    return await bcrypts.compare(pass, hashedPass)
}

module.exports={hashPass, comparePass}