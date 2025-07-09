import transporter from "../config/nodemailer.config.js"
import { EMAIL_USER,HOST } from "../config/env.config.js";

import { verificationTemplate, welcomeTemplate, resetPasswordTemplate, passwordResetSuccessTemplate  } from "./emailTemplate.js"


export const sendVerification = async  ( email,code ) => {
    await transporter.sendMail({
        from:EMAIL_USER,
        to: email,
        subject: 'Account Verification',
        html:verificationTemplate.replace('{verificationCode}',code)
    });
}

export const welcomeEmail = async  ( email, name ) => {
    await transporter.sendMail({
        from:EMAIL_USER,
        to: email,
        subject: 'Welcome',
        html:welcomeTemplate.replace('{userName}',name)
    });
}

export const resetPassword = async  ( email,token ) => {
    const link = `${HOST}/reset-password/${token}`;
    await transporter.sendMail({
        from:EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        html:resetPasswordTemplate.replace('{link}',link) 
    });
}

export const passwordResetSuccess = async  ( email, name ) => {
    await transporter.sendMail({
        from:EMAIL_USER,
        to: email,
        subject: 'Password Reset success',
        html:passwordResetSuccess.replace('{userName}',name)
    });
}