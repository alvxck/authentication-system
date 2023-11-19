import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

import { User, IUser } from '../models/user';

// Register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
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
}

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
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
                }, process.env.JWT_SECRET as Secret, {
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
}


// Home
export const home = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers['authorization'];
        const decodedToken = decodeURI(token as string)
            .split('%2C')[0]
            .slice(2, -1);

        const user = await User.findOne(
            { email: (jwt.decode(decodedToken) as IUser).email}
        )

        if (user) {
            res.status(200).json({username: user.name})
        }

    } catch (err) {
        console.log('Error: ' + err);
        res.status(404).json({error: 'user not found'})
    }
}

// Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers['authorization'];
        const decodedToken = decodeURI(token as string)
            .split('%2C')[0]
            .slice(2, -1);

        await User.deleteOne(
            {email: (jwt.decode(decodedToken) as IUser).email},
        )

        res.status(200).json({message: 'account deleted successfully'})

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500)
    }
}
