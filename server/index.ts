import express, { Express, NextFunction, Request, Response  } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { User, IUser } from './models/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const secret = process.env.TOLKEN_SECRET as string;

const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Connect to MongoDB server
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login_system')
        console.log('Connected to database');
    } catch (err) {
        console.log('Connection to database failed. Error: ' + err); 
    }
})();


// Register
app.post('/api/register', async (req: Request, res: Response) => {
    try {
        // Hash email and password before saving to DB
        let hashEmail = CryptoJS.SHA256(req.body.email).toString(CryptoJS.enc.Base64);
        let hashPassword = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Base64);

        await User.create({
            name: req.body.name,
            email: hashEmail,
            password: hashPassword
        })

        res.status(201).json({message: 'account created'})

    } catch (err) {
        console.log('Error: ' + err);
        res.status(409).json({error: 'account exists already'})
    }
})

 
// Login
app.post('/api/login', async (req: Request, res: Response) => {
    try{

        console.log(req.body);

        // Hash requested email before checking DB
        const user = await User.findOne({
            email: CryptoJS.SHA256(req.body.email).toString(CryptoJS.enc.Base64),
        });
    
        // Hash requested password and compare with password in DB
        let isPasswordValid = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex) == user!.password;
        
        // Create jwt if requested email and password are valid 
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                name: user!.name,
                email: user!.email
                }, 
                secret,
                {
                    expiresIn: '24h'
                }
            );

            res.status(200).json({message: 'account found', user: token, username: user!.name.toLowerCase()});
        } else {
            res.status(400).json({error: 'incorrect password', user: false});
        }
    } catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({error: 'account does not exist'});
    }

})


// User Token Verification Middleware
function verifyToken(req: Request, res: Response, next: NextFunction) {
    try{
        const authHeader = req.headers['authorization']!.split(' ')
        jwt.verify(authHeader[1], secret)

        next();
    } catch (err) {
        console.log('Error: ' + err);
        res.status(401).json({error: 'unathorized token'})
    }
}


// Home
app.get('/api/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers['authorization']!.split(' ')

        const user = await User.findOne(
            { email: (jwt.decode(authHeader[1]) as IUser).email}
        )

        res.status(200).json({username: user!.name})

    } catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({error: 'user not found'})
    }
})

// Delete User
app.delete('/api/:id/delete_account', verifyToken, async (req: Request, res: Response) =>{
    try {
        const authHeader = req.headers['authorization']!.split(' ')

        await User.deleteOne(
            {email: (jwt.decode(authHeader[1]) as IUser).email},
        )

        res.status(200).json({message: 'account deleted successfully'})

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500)
    }
})