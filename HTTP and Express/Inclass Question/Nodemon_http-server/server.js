const http = require("http")

const server = http.createServer((req,res)=>{
    res.setHeader("Content-Type",'text/html')
    if (req.url == '/userData') {
        res.write("<h1>this is a sample text</h1>")
        res.end()
    } else{
        res.end("invalid URL")
    }
})

server.listen(8080,()=>{
    console.log("server is running");
})

// to start server use : npm run dev
