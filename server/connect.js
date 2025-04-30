import mongoose from 'mongoose'
import {Logger} from 'borgen'


const connectDB = (startServer)=>{
mongoose.connect('mongodb://127.0.0.1:27017/AirBnb')
.then(()=>{
    Logger.info({
        message:"Connect to db...",
        messageColor:"gray"
    })

    startServer()
})
    .catch((err)=>{
        console.log(err)
        Logger.info({
            message:"ConnectDb " + err.message,
            messageColor:"red"
        })
    })

}



export default connectDB
