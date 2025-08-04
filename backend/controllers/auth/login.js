const config = require("../../global_variables");
const User = require("../../models/User");

const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (request, response) =>
{
    try
    {
        const { uid, password } = request.body;

        const is_username = await User.findOne({ username: uid });
        const is_email = await User.findOne({ email: uid });

        const user = is_username || is_email;

        if(user)
            return response.status(400).json({ msg: "Enter a valid username or email" });

        const password_matched = await bcrypt.compare(password, user.password);
        
        if(!password_matched)
            return response.status(400).json({ msg: 'Invalid credentials' });

        const jti = uuidv4();
        const payload =
        {
            id: user._id,
            role: user.role,
            jti
        };
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });

        response.status(200).json({ token });
    }
    catch (err)
    {
        console.error(err.message);
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = login;
