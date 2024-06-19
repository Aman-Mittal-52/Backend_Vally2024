//  import required modules from nodejs and build the server
const express = require('express')
const validator = require('./middlewares/validator')
 const app = express()
 
 app.use(express.json())
 app.post("/",validator, (req, res) => {
  res.status(200).send('data received');
});

 const port = 8080

 app.listen(port,()=>{
  console.log(`port is listen at ${port}`)
 })

 module.exports = app
// export the server

