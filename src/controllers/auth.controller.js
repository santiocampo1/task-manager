import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: passwordHashed, username })
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id});

        res.cookie('token', token);
        res.json({
            message: 'User created',
        })
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token);
        res.json({
            message: 'Logged',
        })
    
    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Logged out',
    })
}