import express from "express";
import {  deleteUser, getAllUsers, getOneUser, updateUser } from "../controller/controllerUser.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Update
router.put("/:id", updateUser)
// router.put("/:id", verifyUser, updateUser)


//Delete
router.delete("/:id", deleteUser)
// router.delete("/:id",  verifyUser, deleteUser)

//Get
router.get("/:id", getOneUser)
// router.get("/:id",  verifyUser, getOneUser)

//Get all Users
router.get("/",  getAllUsers)
// router.get("/", verifyAdmin, getAllUsers)

export default router;