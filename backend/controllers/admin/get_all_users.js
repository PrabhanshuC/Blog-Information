const User = require("../../models/User");

const get_all_users = async (request, response) =>
{
    try
    {
        const users = await User.find({}, "-password");
        return response.status(200).json(users);
    }
    catch(error)
    {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = get_all_users;
