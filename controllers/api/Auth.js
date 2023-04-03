import User from "../../models/User.js"
import jwt from "jsonwebtoken"
import Errors from "../../utils/errors.js"
import { set_password, get_password } from "../../utils/encryptPassword.js"
import mailer from "../../settings/mailer.js"
import ForgotPassword from "../../emails/forgot-password.js"



export default class Controller {
    static Registration = async (request, response) => {
        const { firstname, lastname, username, email, password } = request.body

        try {
            const create = new User({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: await set_password(password),
            })
            const result = await create.save()

            // Generate JWT Token
            const token = jwt.sign({ userID: result._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
            response.status(201).send({
                "status": "success",
                "message": "Registeraton successfuly!",
                "token": token,
                "data": result
            })
        } catch (errors) {
            response.send(Errors(errors))
        }
    }

    static Login = async (request, response) => {
        try {
            const email = request.body.email
            const password = request.body.password
            if (!email) {
                response.send({ email: "Email is required" })
            } else if (!password) {
                response.send({ email: "Password is required" })
            } else {
                const user = await User.findOne({ $or: [{ email: email }, { username: email }] })
                if (user) {
                    const isMatch = await get_password(request.body.password, user)
                    if ((user.email === email) && isMatch) {
                        request.session.user = user.id
                        request.session.save()

                        // Generate JWT Token
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" })

                        user.set("password", undefined, { strict: false });

                        response.send({
                            "status": "success",
                            "message": "Login successfully",
                            "token": token,
                            "data": user
                        })
                    } else {
                        response.send({ "status": "failed", "message": "Incorrect password" })
                    }
                } else {
                    response.send({ "status": "failed", "message": "You are not a registered User" })
                }
            }
        } catch (error) {
            response.send({ "status": "failed", "message": "Unable to Login" })
        }
    }

    static ChangePassword = async (request, response) => {
        const { password } = request.body

        if (password) {
            try {
                await User.findByIdAndUpdate(request.user._id, {
                    $set: { password: await set_password(password) }
                })
                response.send({ "status": "success", "message": "Password changed succesfully" })
            } catch (errors) {
                response.send(Errors(errors))
            }
        } else {
            response.send({ password: "Password is required" })
        }
    }

    static UserDetails = async (request, response) => {
        response.send({ "user": request.user })
    }

    static PasswordResetEmail = async (request, response) => {
        const { email } = request.body
        if (email) {
            const user = await User.findOne({ email: email })
            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "15m" })
                const link = `${request.protocol}://${request.get("host")}/api/reset-password/${user._id}/${token}`

                let info = await mailer.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: "abdulhannanzarrar88@gmail.com",
                    subject: "GeekShop - Password responseet Link",
                    html: ForgotPassword({
                        link: link
                    })
                })
                response.send({ "status": "success", "message": "Password reset email sent to your account" })
            } else {
                response.send({ "status": "failed", "message": "Email goes not exists" })
            }
        } else {
            response.send({ "status": "failed", "message": "Email field is required" })
        }
    }

    static PasswordReset = async (request, response) => {
        const password = request.body.password
        const { id, token } = request.params
        const user = await User.findById(id)
        const new_secret = user._id + process.env.JWT_SECRET_KEY

        try {
            jwt.verify(token, new_secret)
            if (!password) {
                response.send({ password: "Password is required" })
            } else {
                await User.findByIdAndUpdate(user._id, { $set: { password: await set_password(password) } })
                response.send({ "status": "success", "message": "Password changed successfully" })
            }
        } catch (error) {
            response.send({ "status": "failed", "message": "Invalid Token" })
        }
    }
}