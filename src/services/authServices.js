import model from '../models/users.model.js'

const getUsers = async (req, res) => {
    const result = await model.getUsers();
    const data=[]
    result.forEach(element => {
        data.push(element.dataValues)
    });
    return data;
}

const getUser = async (id) => {
    id = parseInt(id)
    const result = await model.getUser(id)
    return result.dataValues;
}

const getUserByEmail = async (email) => {
    const result = await model.getUserByEmail(email)
    if(result)  
        return result.dataValues
    else 
        return result
}

const postUser = async (data)=>{
    const result = await model.postUser(data);
    return result;
}

// const updUser= async (req,res)=>{
//     const data = await model.updUser( req.params.id, req.body);
//     res.send(data?"se modifico":"no se modifico");
// }

// const delUser =  async (req, res) => {
//     const result = await model.delUser(req.params.id);
//     console.log(result)
//     res.send(result?"se borro":"no se borro")
// }





const mainServices ={
    getUser,
    getUsers,
    postUser,
    getUserByEmail,
    //delUser,
    //updUser,
}

export default mainServices;