import ApiError from "../../../utils/classes/api-error";
import Joi, {ValidationError} from 'joi';

function validate(schema){
    if(!Joi.isSchema(schema)){
        throw new Error('"schema" must be a Joi schema.');
    }

    return async function(req, res, next){
        try {
            const validatedValue = await schema.validateAsync(req.body, {
                abortEarly: false,
                stripUnknown: true // loai bo truong du lieu khong xac dinh
            });

            req.body = validatedValue;
            return next();
        } catch (error) {
            if(error instanceof ValidationError){
                const errorMessage = error.details.map(details => details.message).join(', ');
                return next(ApiError.badRequest(errorMessage));
            }
            
            return next(error);
        }
    }
}

export default validate;