import Room from "../model/Room.js";
import Hotel from "../model/Hotel.js";
import { createError } from "../utils/error.js";


export const createRoom = async (req, res, next) => {
    //getting Room id 
    const hotelId = req.params.hotelid;
    //create a room instance
    const newRoom = new Room(req.body)
    try {
        // save that instance in the database
        const savedRoom = await newRoom.save()
        try {
            //through the Hotel id we will push the room id in Hotel
            await Hotel.findByIdAndUpdate(hotelId, {
                $push : {rooms: savedRoom._id}
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    } 
}



export const updateRoom = async (req, res, next)=>{

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, 
            { $set: req.body}, {new:true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}


export const updateRoomavailability = async (req, res, next)=>{
    try {
        
       const updatedRoom = await Room.updateOne({"roomNumber._id": req.params.id},{
            $push: {
                "roomNumber.$.unavailableDates": req.body.date },
        })

        res.status(200).json("Room status has been updated")
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req, res, next)=>{
    const hotelId = req.params.hotelid;
    try {
    await Room.findByIdAndDelete(req.params.id)
    try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull : {rooms: req.params.id}
        })
    } catch (error) {
        next(error)
    }
        res.status(200).json("Room has been Deleted")
    } catch (error) {
        next(error)
    }
}

export const getOneRoom = async (req, res, next)=>{
    try {
    const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getAllRooms = async (req, res, next)=>{
    try {
    const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}