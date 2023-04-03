import multer from "multer"

export default multer({
    storage: multer.diskStorage({
        destination: "./src/uploads", //directory (folder) setting
        filename: (request, file, cb) => {
            cb(null, Date.now() + file.originalname) // file name setting
        }
    }),
    fileFilter: (request, file, cb) => {
        const extensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (extensions.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Only jpeg,  jpg , png, and gif Image allow"), false)
        }
    }
})