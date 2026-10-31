import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import 'dotenv/config';

import dns from 'dns'
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

// user routes.
app.use("/api/user", userRouter);

// contact routes.
app.use('/api/contact', contactRouter);


const url = process.env.API_Url;
mongoose.connect(url, {
    dbName: "nodejs_course",
}).then(() => console.log('mongoDB connected..!')).catch((err) => console.log(err));

// home routes
app.get('/', (req, res) => res.json({ message: 'this is home routes working' }));


const port = process.env.PORT;
app.listen(port, () => console.log(`your server is running on the port ${port}`));