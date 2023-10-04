import express from "express";
import { createRoom, deleteRoom, getAllRooms, getOneRoom, updateRoom, updateRoomavailability } from "../controller/controllerRoom.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

//Create
router.post("/:hotelid",  createRoom)
// router.post("/:hotelid", verifyAdmin, createRoom)


//Update
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomavailability);


//Delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//Get
router.get("/:id", getOneRoom)


//Get all Rooms
router.get("/", getAllRooms)

export default router;