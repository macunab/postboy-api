import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
class AuthController {

    constructor(){};
    createJwt(req: Request, res: Response) {
        const JWT_SECRET_KEY = process.env.JWT_SECRET as string;
        const user = req.user;
        console.log(`El usuario es: ${user!.id}`);
        if(user) {
            const token = jwt.sign({user},
                JWT_SECRET_KEY,
                {expiresIn: '1h'},
                (err, token) => {
                    if(err) {
                        return res.status(400).json({
                            ok: false,
                            msg: err.message
                        });
                    }
                    return res.status(200).json({
                        token
                    });
                })
        }
    }

    // todo express-session middleware
    logout(req: Request, res: Response) {
        req.logout(function(err) {
            if(err) {
                console.log(err);
            }
        });
        res.status(200).json({
            ok: true,
            msg: 'Logout'
        });
    }
}

export default new AuthController();