const express = require('express');
const app = express()
const repoRoutes = require('./Routes/repoRoutes')
require('dotenv').config();
const {connectDb,checkConnected} = require('./DB/db')
const PORT = process.env.PORT
app.use(express.json());
app.use('/repo',repoRoutes)
connectDb();

app.get('/', (req, res) => {
    if (checkConnected()) {
      res.send('Database connection status: Connected');
    } else {
      res.send('Database connection status: Connection failed');
    }
  });

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})