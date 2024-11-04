import Joi from 'joi';

const userRequest = {
    validateRegister(data){
        const schema = Joi.object({
            username: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        })
        return schema.validate(data, { abortEarly: false });
    }
}

export default userRequest;