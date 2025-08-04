const update_article = async (req, res) =>
{
    const { title, content, tags, category } = req.body;
    const article = req.article;    // from authorization

    try
    {
        article.title = title;
        article.content = content;
        article.tags = tags;
        article.category = category;

        await article.save();
        res.json(article);
    }
    catch (err)
    {
        console.error(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = update_article;
