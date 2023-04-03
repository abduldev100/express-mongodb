import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    is_active: { type: Boolean, default: true },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    __v: { type: Number, select: false },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "blogs",
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

Schema.virtual("image_url").get(function () {
    return this.image;
});


Schema.plugin(mongoosePaginate);

export default new mongoose.model("Blog", Schema);