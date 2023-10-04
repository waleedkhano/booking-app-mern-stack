import User from "../model/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        //Hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        })

        await newUser.save()
        res.status(200).send("User Has been created.")

    } catch (error) {
        next(error)
    }
}



export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(403, "User not found!"))

        //compare Password
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCorrect) return next(createError(400, "Wrong password or UserName!"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc;
        
        res
        .cookie("access_token", token, { httpOnly:true})
        .status(200).json({ details: {...otherDetails}, isAdmin})

    } catch (error) {
        next(error)
    }
}