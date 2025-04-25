
import User from '../models/user.model.js'
import {Logger} from 'borgen'
import {StatusCodes} from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {Config} from '../config.js'




export const signUpuser = async (req,res)=>{
    try {
        const {name,email,password} = req.body

        const  existingUser= await User.findOne({email})
        if(existingUser){
            res.status(StatusCodes.BAD_REQUEST).json({
                status:'error',
                message:'User already exists',
                data:null
            })
        }



        let hashedPassword = await bcrypt.hash(password, 8)
        //Create new user
        let newUser= await User.create({
            name,
            email,
            password: hashedPassword,
        })

        //Create jwt token
        const token = jwt.sign({id:newUser.id,},Config.JWT_SECRET,{expiresIn:'24h',}, )
       
        return res.status(StatusCodes.OK).json({
            status: 'success',
            message:'User sign Up successful',
            data:{
               newUser,
               token,

            },
        })
        
    } catch (error) {

        Logger.error({message: error.message})

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'A an error occured while creating user',
            data:'null'
        })
        
    }
}


export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})

        //Compare provided password with hashed password in DB
        const isPasswordValid =  await bcrypt.compare(password, user.password )
        if (!isPasswordValid){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:"error",
                message:'Invalid email or password',
                data:null
            })
        }

        //Create jwt
        const token = jwt.sign({id: user.id,}, Config.JWT_SECRET, {expiresIn: '24h'},)

        //If password is valid ,login is succssfull
        return res.status(StatusCodes.OK).json({
            status:'success',
            message:'User login successful',
            data:{
                userId: user._id,
                name: user.name,
                email: user.email,
                token,
            }
        })
    } catch (error) {
        Logger.error({message: error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'An error occured while logining user',
            data:null
        })

        
    }
}