import jwt from 'jsonwebtoken';
import { User } from '../Models/User.js';

export const isAuthenticated = async (req, res, next) => {

    const token = req.header('Auth')

    // console.log('check token = ', token);

    if (!token) return res.json({ message: "login first" })

    const deccoded = jwt.verify(token, process.env.JWT);
    const id = deccoded.userID;

    let user = User.findById(id);
    if (!User) return res.json({ message: "user not found" })

    req.user = user;
    next();

}