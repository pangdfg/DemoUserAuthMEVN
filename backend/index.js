const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const corsOptions = require('./config/cors')
const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./utils/error_handler')
const authenticationMiddleware = require('./middleware/authentication')
const authRoutes = require('./routes/auth')

const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDB()

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(authenticationMiddleware)
app.use(errorHandlerMiddleware)

app.use('/api/auth', authRoutes)
app.all('*', (req, res) => {
    res.status(404)
  
    if(req.accepts('json')){
      res.json({'error': '404 Not Found'})
    }else{
      res.type('text').send('404 Not Found')
    }
  })
  
mongoose.connection.once('open', ()=>{
  console.log('DB connected')
   app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`)})
})