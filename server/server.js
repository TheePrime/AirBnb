import express from 'express'
import {Logger} from  'borgen'
import connectDB from './connect.js'
import router from './routes/router.js'
import {Config} from './config.js'
import cors from 'cors'



const app =express()
const PORT =Config.PORT || 5000


//Middleware

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001', // your frontend address
    credentials: true,
  }));

//Render to webpage at PORT 5000
app.get('/', (req,res)=>{

    res.send("Hello There")
})



//routes
app.use(router)

//Start server and connect to database
const startServer = ()=>{
app.listen(PORT, ()=>{

    Logger.info({
        message: `Server is running on port ${PORT}`,
        messageColor: "cyan"
    })
})
}


connectDB(startServer)