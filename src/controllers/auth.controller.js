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

export const login = (req, res) => {
    res.send('login')
};