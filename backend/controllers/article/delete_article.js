const Article = require("../../models/Article");

const delete_article = async (request, response) =>
{
    const article = request.article;
    try
    {
        await Article.deleteOne({ _id: article._id });

        response.json({ msg: 'Article removed' });
    }
    catch(error)
    {
        console.error(error.message);
        response.status(500).json({ message: "Internal server error" });
    }
};

module.exports = delete_article;
