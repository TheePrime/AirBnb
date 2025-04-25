import {Router} from 'express'
import { loginUser, signUpuser } from '../../controllers/userController.js'
import { userAuth } from '../../middleware/userAuth.js'




const router = Router()

router.post('/register', signUpuser)
router.post('/login', loginUser)



export default router