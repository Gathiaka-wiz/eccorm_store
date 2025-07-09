export const verificationTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify Your Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #FFA500, #FF7E00); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Verify Your Email</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Hello,</p>
        <p>Thank you for signing up! Your verification code is:</p>
        <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #FF7E00;">{verificationCode}</span>
        </div>
        <p>Enter this code on the verification page to complete your registration.</p>
        <p>This code will expire in 15 minutes for security reasons.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        <p>Best regards,<br/>Tech Finds</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
    </body>
    </html>
`;

export const welcomeTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Tech Find</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header with orange gradient -->
    <div style="background: linear-gradient(to right, #FFA500, #FF7E00); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Welcome to Tech Find!</h1>
    </div>

    <!-- Main content card -->
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Hello <strong>{userName}</strong>,</p>
        <p>Thank you for joining Tech finds We’re delighted to have you on board. Here’s a quick guide to get you started:</p>
        
        <ul>
        <li><strong>Verify your email</strong> if you haven’t already. Look for the “Verify Your Email” message we sent.</li>
        <li><strong>Create your profile</strong> by visiting your account settings.</li>
        </ul>
        
        <p>Want to know more about the creator behind Tech Finds? Check out these links:</p>
        <ul>
        <li><a href="https://gathiaka.vercel.app" style="color: #FF7E00; text-decoration: none;">Portfolio</a></li>
        <li><a href="https://github.com/Gathiaka-Wiz" style="color: #FF7E00; text-decoration: none;">GitHub</a></li>
        <li><a href="https://twitter.com/yourhandle" style="color: #FF7E00; text-decoration: none;">Twitter</a></li>
        </ul>
        
        <p>If you have any questions or feedback, feel free to reply to this email or reach out through the links above. We’re here to help!</p>
        
        <p>Best regards,<br/>
        The Tech Finds Team</p>
    </div>

    <!-- Footer note -->
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
    </body>
    </html>

`;

export const resetPasswordTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Your Password</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #FFA500, #FF7E00); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Password Reset</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Hello,</p>
        <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
        <a href="{link}" style="background-color: #FF7E00; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
        </a>
        </div>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>Best regards,<br/>Tech Finds</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
    </body>
    </html>
`;

export const passwordResetSuccessTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset Successful</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #FFA500, #FF7E00); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <p>Hello,{userName}</p>
        <p>We're writing to confirm that your password has been successfully reset.</p>
        <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #FF7E00; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
            ✓
        </div>
        </div>
        <p>If you did not initiate this password reset, please contact our support team immediately.</p>
        <p>For security reasons, we recommend that you:</p>
        <ul>
        <li>Use a strong, unique password</li>
        <li>Avoid using the same password across multiple sites</li>
        </ul>
        <p>Thank you for helping us keep your account secure.</p>
        <p>Best regards,<br/>Tech Finds</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
        <p>This is an automated message, please do not reply to this email.</p>
    </div>
    </body>
    </html>
`;
