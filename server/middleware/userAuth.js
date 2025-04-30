import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import {Config}  from '../config.js'
import User from '../models/user.model.js';


export const userAuth = async (req,res,next)=>{
    try {
        const token =  req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status:'error',
                message:'Token not provided',
                data:null,
            })
        }

        //verify and decode token
        const decoded = jwt.verify(token,Config.JWT_SECRET)
        const userId = decoded.id

        let user = await User.findById(userId)

        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: "error",
                message: "You are not allowed to perform this action",
                data: null,
              });
        }

        res.userId = userId

        next()
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            status:'error',
            message:'You are not allowed to perform this action',
            data:null,
        })
        
    }
}

