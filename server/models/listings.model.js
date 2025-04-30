import {model,Schema}  from 'mongoose'


export const ListingSchema = new Schema({
title:{
    type:String,
    required:true,
},
location:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
image:{
    type:String,
},
description:{
    type:String,

},
},
{timestamps:true},
)



const Listings=model('Listings', ListingSchema)

export default Listings