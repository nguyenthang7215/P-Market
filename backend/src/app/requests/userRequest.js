import Joi from 'joi';

export const createUser = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .label('First Name'),
    lastName: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
        .label('Last Name'),
    userName: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required()
        .label('User Name'),
    email: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .email()
        .required()
        .label('Email'),
    password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .label('Mật khẩu')
})

export const resetPassword = Joi.object({
    password: Joi.string()
        .min(6)
        .max(255)
        .required()
        .label('Mật khẩu mới')
})

export const updateProfile = Joi.object({
    userName: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required()
        .label('User Name'),
    phone: Joi.string()
        .trim()
        .max(15)
        .required()
        .label('Phone Number'),
    address: Joi.string()
        .trim()
        .max(255)
        .required()
        .label('Địa chỉ')
})