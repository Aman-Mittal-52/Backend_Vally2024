const http = require("http")

const server = http.createServer((req,res)=>{
    res.setHeader("Content-Type",'text/html')
    if (req.url == '/abc') {
        res.end("ended line")
        res.write("<h1>Hi this is a sample text</h1>")
    }
})

server.listen(3000,()=>{
    console.log("server is running");
})