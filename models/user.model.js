import {model, Schema} from 'mongoose'


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type: String,
        required: true,
    }
},
{timestamps:true},
)

const User = model('User', UserSchema)

export default User