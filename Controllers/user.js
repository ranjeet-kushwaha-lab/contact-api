import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (name == "" || email == "" || password == "")
        return res.json({ message: "all fields are required" });

    // if dublicate email not allowed to register.
    let user = await User.findOne({ email });
    if (user)
        return res.json({ message: "user already exist", sucess: false })

    // password hashing.
    const hashPassword = await bcrypt.hash(password, 10);

    // creating user DB.
    user = await User.create({ name, email, password: hashPassword });

    res.json({ message: 'user created sucessfully', sucess: true, user });
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "")
        return res.json({ message: "all fields are required" });

    const user = await User.findOne({ email });

    if (!user) return res.json({ message: "user not exist", sucess: false });

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.json({ message: "invalid password", sucess: false });

    const token = jwt.sign({ userID: user._id }, process.env.JWT, {
        expiresIn: "1d"
    })

    res.json({ message: `welcome ${user.name}`, token, sucess: true });
}