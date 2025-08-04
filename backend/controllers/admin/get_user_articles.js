const Article = require("../../models/Article");

const get_user_articles = async (request, response) =>
{
    try
    {
        const { id } = request.params;

        const articles = await Article.find({ author: id }).populate("author", "username name");

        if(!articles.length)
            return response.status(404).json({ message: "No articles found for this user." });

        return response.status(200).json(articles);
    }
    catch(error)
    {
        console.error(error);
        return response.status(500).json({ message: "Internal Server Error." });
    }
};

module.exports = get_user_articles;
