import {Router}  from 'express'
import userGroup from './userGroup.js'



const router = Router()

router.use('/user', userGroup)


export default router