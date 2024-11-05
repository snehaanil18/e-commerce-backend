import userRequest from "../Request/userRequest.js";
import userRepository from "../Repository/userRepository.js";
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js';

const userController = {
    async registerUser(req,res){
        const {username, email, password} = req.body;
        const {error} = userRequest.validateRegister({username,email,password})
        if(error){
            res.status(400).json({success:false , message : 'Validation error'})
        }
        try{
            const userexist = await userRepository.findUserbyEmail(email)
            if(userexist){
                res.status(400).json({success:false, message: 'User already exist'})
            }
            
            const newUser = await userRepository.createUser(username,email,password)
            res.status(200).json({success:true, details: newUser, message: 'User Registered Successfully'})
        }
        catch(error){
            res.status(500).json({success:false,details:error,message:'Server error'})
        }
    },

    async loginUser(req,res){
        try{
            const {email,password} = req.body;
            
            const existingUser = await userRepository.findUserbyEmail(email);

            if(!existingUser){
                res.status(400).json({success:false, message: 'User with given email does not exist'})
            }

            const decryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
            

            if(decryptedPassword == existingUser.password){
 
                const token = jwt.sign(
                    { userId: existingUser._id },
                    process.env.JWT_SECRET
                  );
                res.status(200).json({success:true,token, message: 'User logged in'})
            }
            else{
                res.status(400).json({success:false, message: 'Invalid Password'})
            }
           
        }
        catch(error){
            res.status(500).json({success:false,details:error,message:'Server error'})
        }
    },


}

export default userController;