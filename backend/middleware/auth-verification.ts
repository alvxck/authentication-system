import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// Auth Token Verification
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization'];
        const decodedToken = decodeURI(token as string)
            .split('%2C')[0]
            .slice(2, -1);

        jwt.verify(decodedToken, process.env.JWT_SECRET as Secret) as JwtPayload;

    } catch (err) {
        console.log('Error: ' + err);
        res.status(401).json({error: 'Invalid `authorization` header'})
    }

    next();
}