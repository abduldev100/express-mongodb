import jwt from "jsonwebtoken"
import UserModel from "../models/User.js"

export default async (request, response, next) => {
  let token
  const authorization = request.headers.authorization
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1] // Get Token from header
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY) // Verify Token
      request.user = await UserModel.findById(userID).select("-password") // Get User from Token
      next()
    } catch (error) {
      response.status(401).send({ "status": "failed", "message": "Authorization token might be invalid or maybe it is expired" })
    }
  } else if (!token) {
    response.status(401).send({ "status": "failed", "message": "Unauthorized user request" })
  }
}
