import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelRoom, getOneHotel, updateHotel } from "../controller/controllerHotel.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//Create
router.post("/", createHotel)
// router.post("/", verifyAdmin, createHotel)


//Update
router.put("/:id", verifyAdmin, updateHotel)


//Delete
router.delete("/:id",verifyAdmin, deleteHotel)

//Get
router.get("/find/:id", getOneHotel)


//Get all Hotels
router.get("/", getAllHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRoom)

export default router;