import express,{Request ,Response} from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const router= express.Router();

interface signUpBody{
    email:string,
    name:string,
    password:string
}

interface signInBody{
    email:string,
    password:string
}

router.post('/signup',async(req:Request<{}, {}, signUpBody> ,res:Response)=>{

    try{    
        const {email, name, password}=req.body;
        console.log("email , name , pass=", email ,name , password);

        const user= await User.findOne({email});

        if(user){
            res.status(404).json({
                message:"user already exist try different emailid"
            })
            return;
        }

        const newUser= await User.create({
            name,
            email,
            password
        })


        const token= jwt.sign(
           { id:newUser._id, email:newUser.email},
           process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        res.status(200).json({
            message:"signup completed",
            user:newUser
        })

    }catch(e){
        console.log("error during signup=", e);
        res.status(500).json({
            message:"server error"
        })
    }
})

router.post("/signin",(req:Request<{},{},signInBody>, res:Response)=>{
    const {email , password}=req.body;

    console.log("email , password", email  ,password);

    res.status(200).json({
        message:"sign in completed"
    })
})

export default router;