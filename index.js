const express = require('express')

const app= express()
app.listen(8000 , ()=> console.log("server is running on port 8000"))

app.get('/' , (req,res)=> res.render("hello"))