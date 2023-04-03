export default (err) => {
    const errors = []
    if (err.errors) {
        for (const [key, value] of Object.entries(err.errors)) {
            const name = key[0].toUpperCase() + key.slice(1)

            if (value.kind === "required") {
                errors.push({ [key]: value.message });
            } else if (value.kind === "Boolean") {
                errors.push({ [key]: name + " field must be boolean" });
            } else if (value.kind === "ObjectId") {
                errors.push({ [key]: name + " is not valid" });
            } else {
                errors.push({ [key]: value.message });
            }
        }
    } else if (err.code == 11000) {
        const name = Object.keys(err.keyPattern)[0]
        const cname = name[0].toUpperCase() + name.slice(1)
        errors.push({ [name]: cname + " field must be unique" })
    }

    return errors
}