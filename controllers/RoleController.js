const roleModel = require('../models/RoleModel')

const addRole = async (req, res) => {
    try{
        const saveRole = await roleModel.create(req.body);
        res.status(201).json({
            status : "success",
            data : saveRole
        });
    } catch(err){
        res.status(400).json({
            status : "fail",
            message : err.message,
        });
    }
};

const getRoles = async (req, res) =>{ 
    try{
        const roles = await roleModel.find({status: true});
        res.status(201).json({
            status : "success",
            data : roles
        }) 
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : err.message,
        })
    }
}

module.exports = {
    addRole,
    getRoles
}