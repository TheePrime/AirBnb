import {Router} from 'express'
import { getProfile, loginUser, signUpuser } from '../../controllers/userController.js'
import { userAuth } from '../../middleware/userAuth.js'




const router = Router()

router.post('/register', signUpuser)
router.post('/login', loginUser)
router.get('/profile/:id', userAuth, getProfile)



export default router