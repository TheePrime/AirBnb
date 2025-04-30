import {Router}  from 'express'
import userGroup from './userGroup.js'
import listingGroup from  './listingGroup.js' 



const router = Router()

router.use('/user', userGroup)
router.use('/listings', listingGroup)


export default router