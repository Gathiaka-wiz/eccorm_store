import transporter from "../config/nodemailer.config.js"
import { EMAIL_USER,HOST } from "../config/env.config.js";

import { verificationTemplate, welcomeTemplate, resetPasswordTemplate, passwordResetSuccessTemplate  } from "./emailTemplate.js"


export const sendVerificationEmail = async  ( email, code ) => {
    try {
        await transporter.sendMail({
            from:EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            html:verificationTemplate.replace('{verificationCode}',code)
        });
    } catch (err) {
        const error = new Error(`Failed to send verification email ${err} `);    
        error.statusCode = 500;
        throw error;
    }
}

export const sendWelcomeEmail = async  ( email, name) => {
    try {
        await transporter.sendMail({
            from:EMAIL_USER,
            to: email,
            subject: 'Welcome',
            html:welcomeTemplate.replace('{userName}',name)
        });
    } catch (err) {
        const error = new Error(`Failed to send welcome email ${err}`);
        error.statusCode = 500;
        throw error;
    }
}

export const sendResetPasswordEmail = async  ( email, token ) => {
    try {
        const link = `${HOST}/reset-password/${token}`;
        await transporter.sendMail({
            from:EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html:resetPasswordTemplate.replace('{link}',link) 
        });
    } catch (err) {
        const error = new Error(`Failed sending password reset link : ${err} `);
        error.statusCode = 500;
        throw error;
    }
}

export const SendPasswordResetSuccessEmail = async  ( email, name ) => {
    try {
        await transporter.sendMail({
            from:EMAIL_USER,
            to: email,
            subject: 'Password Reset success',
            html:passwordResetSuccess.replace('{userName}',name)
        });
    } catch (err) {
        const error = new Error(`Failed sending password reset success email : ${err} `);
        error.statusCode = 500;
        throw error;
    }
}