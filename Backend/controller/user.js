const User=require('../models/user')

function isStringInValid(string){
    if(string===undefined ||string===null ||string.length===0){
        return true;
    }
    else{
        return false;
    }
}

exports.postSignUpUser=async(req,res,next)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    if(isStringInValid(email) || isStringInValid(password)){
        return res.status(400).json({err:"Bad parameters..Something is missing"})
    }
    
    await User.create({
        email:email,
        password:password
    })
    res.status(201).json({message:"You are successfully signed up"})
    
   }
    catch(err){
       res.status(500).json({err:"Email_exist"})
    }
}

