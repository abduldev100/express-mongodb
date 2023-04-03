import User from "../../models/User.js"
import paginationOpt from "../../utils/pagination.js"
import Errors from "../../utils/errors.js"

export default class Controller {
    static create = async (request, response) => {
        try {
            const record = new User(request.body)
            const result = await record.save()
            response.send(result)
        } catch (errors) {
            response.send(Errors(errors))
        }
    }
    static listing = async (request, response) => {
        try {
            const id = request.params.id;
            if (!id) {
                const options = paginationOpt
                options.sort = { "created_at": -1 }

                await User.paginate({}, options, function (err, result) {
                    if (err) {
                        response.send(err)
                    } else {
                        response.send(result)
                    }
                });
            } else {
                const records = await User.findOne({ _id: id })
                response.send(records)
            }
        } catch (error) {
            response.send(error)
        }
    }
    static update = async (request, response) => {
        try {
            const result = await User.findByIdAndUpdate(request.params.id, request.body)
            response.send(result)
        } catch (error) {
            response.send(error)
        }
    }
    static delete = async (request, response) => {
        try {
            await User.findByIdAndDelete(request.params.id)
            response.send({ "message": "Deleted successfully","status" : "success"})
        } catch (error) {
            response.send(error)
        }
    }
}