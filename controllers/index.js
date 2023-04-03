
export default class Pages {
    static Home = (request, response) => {
        console.log(request.session.user)
        response.render("index.html")
    }

    static Logout = (request, response) => {
        request.session.destroy(() => {
            response.redirect("/")
        })
    }
}