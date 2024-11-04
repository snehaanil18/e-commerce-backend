import users from "../Models/userSchema.js"
import CryptoJS from 'crypto-js';

const userRepository = {
    async findUserbyEmail(email) {
        const user = users.findOne({ email })
        return user
    },

    async createUser(username,email,password){
        const hashedPassword =  CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        const newUser = new users({
            username,
            email,
            password:hashedPassword
        });
        return await newUser.save();
    },




}

export default userRepository;

