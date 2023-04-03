import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname field is required"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Lastname field is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Name field is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
        unique: true,
        trim: true,
    },
    is_active: { type: Boolean, required: true, default: true },
    is_superuser: { type: Boolean, required: true, default: true },
    __v: { type: Number, select: false },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "users",
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})
Schema.plugin(mongoosePaginate);


export default new mongoose.model("User", Schema);