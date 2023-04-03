import bcrypt from "bcrypt"

const set_password = async (password) => {
    if (password) {
        const salt = await bcrypt.genSalt(15)
        return await bcrypt.hash(password, salt)
    } else {
        return null;
    }
}

const get_password = async (password, user) => {
    return await bcrypt.compare(password, user.password)
}

export { set_password, get_password }