const express =  require('express')

const server = express()

server.get('/instagram',(req,res)=>{
    res.send("Instagram profil data")
})
server.get('/facebook',(req,res)=>{
    res.send("facebook profil data")
})
server.get('/whatsapp',(req,res)=>{
    res.send("whatsapp profil data")
})

server.listen(8080, ()=>{
    console.log("Express Server is running");
})