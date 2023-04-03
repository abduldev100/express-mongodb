import User from "../models/User.js"

const IsLogin = async (request, response, next) => {
    if (request.session.user) {
        next()
    } else {
        request.redirect("/");
    }
}

const IsLogout = async (request, response, next) => {
    if (!request.session.user) {
        next()
    } else {
        request.redirect("/");
    }
}

const LoggedIn = async (request, response, next) => {
    // if (request.session.user) {
    //     request.user = await User.findById(request.session.user).select("-password")
    //     next()
    // } else {
    //     next()
    // }
    next()

}
export { IsLogin, IsLogout, LoggedIn }


