const RoleModel = require('../models/RoleModel');
const userModel = require('../models/UserModel')
const passwordUtil = require('../util/PasswordUtil')
const TokenUtil = require('../util/TokenUtil')

const createUser = async (req, res) =>{
    const hashPassword = await passwordUtil.hashPassword(req.body.password);
    const user = Object.assign(req.body,{password : hashPassword});
    console.log(user);
    try{
        const savedUser = await userModel.create(user);
        res.status(201).json({
            status : "success",
            data : savedUser
        });
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : err.message
        })
    }
};

const getAlluser = async (req, res) => {
    try{
        const user = await userModel.find({status : true}).populate('role')
        if(user){
            res.status(200).json({
                status : 'success',
                data : user
            })
        }else{
            res.status(404).json({
                status : "fail",
                message : "No User Found"
            }) 
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : err.message,
        });
    }  
}

const loginUser = async(req, res) => {
    
    const {email, password} = req.body;
    try{
        const userFromEmail = await userModel.findOne({email : email}).populate('role');
        console.log(userFromEmail)
        if(userFromEmail){
            const isPasswordMatched = await passwordUtil.comparePassword(password,userFromEmail.password)
            if(isPasswordMatched){
                const token = TokenUtil.generateToken(userFromEmail.toObject());
                res.status(200).json({
                    status : "success",
                    data : token,
                    role : userFromEmail.role
                });
            }
            else{
                res.status(401).json({
                    status : "fail Password",
                    data : "Incorrect Password"
                })
            }
        }else{
            res.status(404).json({
                status : "fail",
                message : "No User Found"
            })
        }     
    }catch(err)
    {
        res.status(400).json({
            status : "fail",
            message : err.message,
        })
    }
}

module.exports = {
    createUser,
    getAlluser,
    loginUser
}