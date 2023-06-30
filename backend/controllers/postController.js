const sequelize = require("../db/connection")

/* GET posts listing */
exports.getPosts = async (req, res) => {
    try {
        const postsList = await sequelize.query(
            `SELECT * FROM posts       `
            //   ORDER BY posts.id DESC

        );
        res.send(postsList[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error getting posts" });
    }
}

/* POST create new post */
exports.createPost = async (req, res) => {
    const { title, body } = req.body;
    try {
        const newPost = await sequelize.query(
            `INSERT INTO posts (title, body) VALUES ('${title}','${body}')`,
            { type: sequelize.QueryTypes.INSERT }
        );
        res.status(200).json({
            id: newPost[0],
            title,
            body
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error creating post" });
    }
}

/* PUT edit post by id */
exports.updatePost = async (req, res) => {
    const postId = req.params.id
    const { title, body } = req.body
    try {
        const findPost = await sequelize.query(`SELECT * FROM posts WHERE id = '${postId}'`)
        if (findPost[0].length === 0) {
            res.status(404).send({ message: "Post not found" });
        } else {
            const updatePost = await sequelize.query(
                `UPDATE posts SET 
            title = IF('${title}' = "", title, '${title}'),
            body = IF('${body}' = "", body, '${body}')
            WHERE id = ${postId}`)
            res.status(200).send({ message: "Post successfully updated" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error updating post" });
    }
}

/* DELETE delete post by id */
exports.deletePost = async (req, res) => {
    const postId = req.params.id
    try {
        const findPost = await sequelize.query(`SELECT * FROM posts WHERE id = '${postId}'`)
        if (findPost[0].length === 0) {
            res.status(404).send({ message: "Post not found" });
        } else {
            const deletePost = await sequelize.query(`DELETE FROM posts WHERE id = ${postId}`)
            res.status(200).send({ message: "Post successfully deleted" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error deleting post" });
    }
}