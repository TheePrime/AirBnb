import {Router} from 'express'
import { createListing, deleteListing, getAllListings, getListingById, updateListing } from '../../controllers/listingController.js'
import { userAuth } from '../../middleware/userAuth.js'


const router = Router()


router.post('/create', userAuth, createListing)
router.get('/find/:id', userAuth, getListingById)
router.get('/all',userAuth, getAllListings)
router.put('/update/:id',userAuth, updateListing)
router.delete('/delete/:id',userAuth, deleteListing)

export default router