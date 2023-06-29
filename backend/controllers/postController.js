const sequelize = require("../db/connection")

/* GET posts listing */
exports.getPosts = async (req, res) => {
    try {
        const postsList = await sequelize.query(
            `SELECT * FROM posts       `
            //   ORDER BY posts.id DESC
            ,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.send(postsList);
    } catch (e) {
        console.error(e);
        res.status(400).send({ error: e.message });
    }
}

/* POST create new post */
exports.createPost = async (req, res) => {
    const { title, body } = req.body;
    try {
        const newPost = await sequelize.query(
            'INSERT INTO posts (title, body) VALUES (?, ?)',
            {
                type: sequelize.QueryTypes.INSERT,
                replacements: [title, body]
            },
        );
        res.status(200).json({
            id: newPost[0],
            title,
            body
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({ error: e.message });
    }
}

/* PUT edit post by id */
exports.updatePost = async (req, res) => {
    const postId = req.params.id
    const { title, body } = req.body
    try {
        const updatePost = await sequelize.query(`UPDATE posts SET 
        title = IF('${title}' = "", title, '${title}'),
        body = IF('${body}' = "", body, '${body}')
        WHERE id = ${postId}`)
        res.status(200).send({ message: "Post successfully updated" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error updating post" });
    }
}

/* DELETE delete post by id */
exports.deletePost = async (req, res) => {
    const postId = req.params.id
    try {
        const deletePost = await sequelize.query(`DELETE FROM posts WHERE id = ${postId}`)
        res.status(200).send({ message: "Post successfully deleted" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error deleting post" });
    }
}