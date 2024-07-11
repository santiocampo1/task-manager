import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json(['User already exists']);
        }

        const passwordHashed = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: passwordHashed, username })
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            message: 'User created',
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'OK',
    })
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(404).json({ message: 'User not found' });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(404).json({ message: 'User not found' });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}
