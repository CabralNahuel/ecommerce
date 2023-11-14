module.exports = {
    home : (req,res)  => res.send("hola desde el home"),
    contact : (req,res)  =>  res.send("hola desde contact"),
    about : (req,res)  => res.send("hola desde about"),
    faqs : (req,res)  => res.send("hola desde faqs")
}