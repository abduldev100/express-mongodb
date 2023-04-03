import Blog from "../../models/Blog.js"
import paginationOpt from "../../utils/pagination.js"
import Errors from "../../utils/errors.js"



export default class Controller {
    static create = async (request, response) => {
        try {
            const data = request.body
            data.image = request.file.filename
            const record = new Blog(data)
            const result = await record.save()
            const records = await Blog.findOne({ _id: result._id }).populate(["created_by", "category"])
            response.send(records)
        } catch (errors) {
            response.send(Errors(errors))
        }
    }
    static listing = async (request, response) => {
        try {
            const id = request.params.id;
            if (!id) {
                const options = paginationOpt
                options.populate = ["created_by", "category"]
                options.sort = { "created_at": -1 }

                await Blog.paginate({}, options, function (err, result) {
                    if (err) {
                        response.send(err)
                    } else {
                        response.send(result)
                    }
                });
            } else {
                const records = await Blog.findOne({ _id: id })
                response.send(records)
            }
        } catch (error) {
            response.send(error)
        }
    }
    static update = async (request, response) => {
        try {
            const result = await Blog.findByIdAndUpdate(request.params.id, request.body)
            response.send(result)
        } catch (error) {
            response.send(error)
        }
    }
    static delete = async (request, response) => {
        try {
            await Blog.findByIdAndDelete(request.params.id)
            response.send({ "message": "Deleted successfully", "status": "success" })
        } catch (error) {
            response.send(error)
        }
    }
}
