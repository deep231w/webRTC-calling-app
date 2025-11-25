import express,{Request ,Response} from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

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

        if(!email || !name || !password){
            res.status(400).json({
                message:"invalid credentials"
            })
            return;
        }

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

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"strict",
            path:"/"
        })

        return res.status(200).json({
            message:"signup completed",
            user:newUser,
            token:token
        })

    }catch(e){
        console.log("error during signup=", e);
        res.status(500).json({
            message:"server error"
        })
    }
})

router.post("/signin",async(req:Request<{},{},signInBody>, res:Response)=>{
    try{
        const {email , password}=req.body;

        if(!email || !password){
            res.status(400).json({
                message:"invalid credential"
            })

            return;
        }

        console.log("email , password", email  ,password);

        const user = await User.findOne({email});

        if(!user){
            res.status(403).json({
                message:"user doesnot exist "
            })
            return ;
        }

        const userPassword =user.password;
        
        if(password !=userPassword){
            res.status(404).json({
                message:"password didnt match"
            })
            return;
        }

        const token= jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET!,
            {expiresIn:"7d"}
        )

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"strict",
            path:"/"
        })

        return res.status(200).json({
            message:"sign in completed",
            user:user,
            token:token
        })
    }catch(e){
        console.log("error during signin =", e);

        res.status(500).json({
            message:"server error"
        })
    }
})

export default router;