const express = require('express');
const app = express()
const repoRoutes = require('./Routes/repoRoutes')
require('dotenv').config();
const PORT = process.env.PORT
app.use(express.json());
app.use('/repo',repoRoutes)

app.get('/',(req,res)=>{
    res.send('server started')
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})