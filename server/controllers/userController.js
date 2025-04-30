
import User from '../models/user.model.js'
import {Logger} from 'borgen'
import {StatusCodes} from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {Config} from '../config.js'



//Register user POST /api/v1/user/register
export const signUpuser = async (req,res)=>{
    try {
        const {name,email,password} = req.body

        if(!name||!email||!password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:'error',
                message:'Enter all the credentials',
                data:null
            })
        }
        //Check if user already exits
        const  user= await User.findOne({email})
        if(user){
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


//Login user POST /api/v1/user/login

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body

        if(!email||!password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:'error',
                message:'Enter all the credentials',
                data:null
            })
        }
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


//Get user profile GET /api/v1/user/profile

export const getProfile = async (req, res) => {
    try {
        const  userId = req.params.id
    const user = await User.findById(userId).select("-password");
    
    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({
            status:'error',
            message:'User not found',
            data:null
        })
    }

    return res.status(StatusCodes.OK).json({
      status: "success",
      message:'Profile fetched successfully',
      data: user,
    });
    
    } catch (error) {
        Logger.error({message: error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'An error occured while trying to fetch user profile',
            data:null
        })
    }
    
  };
  