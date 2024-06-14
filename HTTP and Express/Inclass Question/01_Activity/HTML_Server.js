const { log } = require('console');
const http =  require('http');
const server = http.createServer((req,res)=>{
    if (req.url == '/') {
        res.setHeader('Content-Type','text/html')
        res.write("<h1>Home</h1>")
        res.write(`<a href="about">about</a><br><a href="contact">contact</a>`)
        res.end()
    }
    if (req.url == '/about') {
        res.setHeader('Content-Type','text/html')
        res.write("<h1>about</h1>")
        res.write(`<a href="/">home</a><br><a href="contact">contact</a>`)
        res.end()
    }
    if (req.url == '/contact') {
        res.setHeader('Content-Type','text/html')
        res.write("<h1>Contact</h1>")
        res.write(`<a href="about">about</a><br><a href="/">home</a>`)
        res.end()
    }
})

server.listen(8080,()=>{
    console.log("server is runing");
})