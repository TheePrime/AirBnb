import { StatusCodes } from "http-status-codes";
import Listings from "../models/listings.model.js";
import User from "../models/user.model.js";
import {Logger} from 'borgen'




//Create new listing   POST 

export const createListing = async (req,res)=>{
    try {
        const {title,location,price,image,description} = req.body
        const user = res.userId

        if(!title||!location||!price||!description){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:'error',
                message:'Please provide all required info',
                data:null
        })
        }

        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: "error",
                message: "user not found",
                data: null,
              });
        }

        const newListing = await Listings.create({
            title,
            location,
            price,
            image,
            description,
        })
        

        return res.status(StatusCodes.OK).json({
            status:'success',
            message:'Listing created successfully',
            data:newListing,
        })
    } catch (error) {
        Logger.error({message:error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'There was an error while creating a listing',
            data:null
        })
    }
}

//Get  listing by Id  GET /api/v1/listing/:id

export const getListingById = async (req,res)=>{
    try {
        const listingId= req.params.id
        const listing  = await Listings.findById(listingId)

        if(!listing){
            return res.status(StatusCodes.NOT_FOUND).json({
                status:'error',
                message:'Listings not found',
                data:null
            })
        }

        return res.status(StatusCodes.OK).json({
            status:'success',
            message:'Listing fetched sucessfully',
            data:listing
        })
    } catch (error) {
        Logger.error({message: error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'An error occured while fetching a listing',
            data:null
        })
    }
}

//Get all listings GET /api/v1/listing/all


export const getAllListings = async (req,res)=>{
    try {
        const listings = await Listings.find()

        if(!listings){
            return res.status(StatusCodes.NOT_FOUND).json({
                status:'error',
                message:'Listings not found',
                data:null
            })
        }

        return res.status(StatusCodes.OK).json({
            status:'success',
            message:'Listings fetched successfully',
            data:listings
        })
    } catch (error) {
        Logger.error({message: error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'An error occured while fetching all listings',
            data:'null'
        })
        
    }
}

//Update a listing  PUT /api/v1/listing/update/:id

export const updateListing = async (req,res)=>{
    try {
        const listingId = req.params.id

        const listing = await Listings.findById(listingId)

        if(!listing){
            return res.status(StatusCodes.NOT_FOUND).json({
                status:'error',
                message:'Listing not found',
                data:null
            })
        }

        const updatedListing = await Listings.findByIdAndUpdate(listingId,req.body,{
            new: true,
            runValidators:true,
        })


        return res.status(StatusCodes.OK).json({
            status:'success',
            message:'Listing updated successfully',
            data:updatedListing
        })


    } catch (error) {
        Logger.error({message:error.message})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status:'error',
            message:'An error occured while updating listing',
            data:null
        })
    }


}


//Delete listing by id  DELETE /api/v1/listing/delete/:id


export const deleteListing = async (req,res)=>{
     const listingId = req.params.id

     const listing= await Listings.findByIdAndDelete(listingId)

     if(!listing){
        return res.status(StatusCodes.NOT_FOUND).json({
            status:'error',
            message:'Listing not found',
            data:null
        })
     }

     return res.status(StatusCodes.OK).json({
        status:'success',
        message:'Listing deleted successfully',
        data:null
     })

    
}