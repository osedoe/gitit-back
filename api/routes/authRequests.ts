import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../model/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const requestSignup = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { email, token } = req.body;
    console.log('🍓', token);

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists. Please update the token...' });
        }

        user = new User({ email, token });

        const salt = await bcrypt.genSalt(10);
        user.token = await bcrypt.hash(token, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'randomString', {},
            (err, jwtToken) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({ jwtToken });
                // "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVlZmIzNDgxOTE3MTBkNWY5NzRkMzExIn0sImlhdCI6MTU5Mjc2NzMwNX0.jwzuFBz1TASEXl_njLBOozPIa499bbCbcyOyE-dhKMU"
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error while saving');
    }
};
