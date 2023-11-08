module.exports = {
    getAuthLogin : (req,res)  => res.send("hola desde auth/login"),
    getAuthLogout : (req,res)  =>  res.send("hola desde /auth/logout"),
    getAuthRegister : (req,res)  => res.send("hola desde /auth/register"),
    postAuthLogin : (req,res)  => res.send("hola desde post auth/login"),
    postAuthRegister : (req,res)  => res.send("hola desde post /auth/register"),
}