const Article = require("../../models/Article");
const User = require("../../models/User");

/**
 * @desc    Delete a user and their associated content
 * @route   DELETE /api/admin/users/:id
 * @access  Admin
 */
const delete_user = async (request, response) =>
{
    try
    {
        const user_id = request.params.id;
        
        // 1. Delete user's articles
        await Article.deleteMany({ author: user_id });
        // 2. Delete the user
        await User.findByIdAndDelete(user_id);

        response.status(200).json({ message: "User and all associated content deleted." });
    }
    catch(error)
    {
        console.error(error.message);
        
        response.status(500).json({ message: "Server Error" });
    }
};

module.exports = delete_user;
