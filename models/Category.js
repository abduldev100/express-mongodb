import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required"],
        unique: [true, "This name is already exists"],
        trim: true
    },
    is_active: { type: Boolean, default: true },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    __v: { type: Number, select: false },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "categories",
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

Schema.plugin(mongoosePaginate);

export default new mongoose.model("Category", Schema);