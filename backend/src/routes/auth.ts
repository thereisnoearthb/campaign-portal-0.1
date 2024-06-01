import { Router, Response, NextFunction } from 'express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
// import * as path from 'path';
dotenv.config();

const router = Router();
const USERNAME = process.env.UNAME as string;
// console.log(USERNAME);
const PASSWORD = process.env.PASS as string;
// console.log(PASSWORD);
const SECRET_KEY = process.env.JWT_SECRET as string;
// console.log(SECRET_KEY);


// Route for user login
router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    // req.user
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

// testing protected
router.get('/protected', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
