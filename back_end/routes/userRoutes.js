import express from "express";
import User from '../models/userModel.js';
const router = express.Router();


router.post('/',async(req, res)=>{
    const {name, password} = req.body;
    try {
        const newUser = new User({name, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/login', async(req, res)=>{
    const {name, password} = req.body;

    try {
        const user = await User.findOne({name});
        if (user.password !== password) {
            return res.status(400).json({message: 'Invalid name or password'});
        }
        res.json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;