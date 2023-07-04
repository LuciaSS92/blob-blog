const sequelize = require("../db/connection")
const fs = require('fs')

//CRUD

/* GET posts listing */
exports.getPosts = async (req, res) => {
    try {
        const postsList = await sequelize.query(
            `SELECT * FROM posts `
        );
        res.send(postsList[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error getting posts" });
    }
}

//  GET post by id
exports.getPostById = async (req, res) => {
    const postId = req.params.id
    try {
        const post = await sequelize.query(
            `SELECT * FROM posts WHERE id = '${postId}'`
        );
        res.send(post[0][0]);
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error getting post" });
    }
}


/* POST create new post */
//Save text data to db, save image file at /public/images with name id.jpg
exports.createPost = async (req, res) => {
    const { title, body } = req.body;
    const file = req.files.file

    try {
        const newPost = await sequelize.query(
            `INSERT INTO posts (title, body) VALUES ('${title}','${body}')`,
            { type: sequelize.QueryTypes.INSERT });

        const postId = newPost[0]
        const path = `${__dirname}/../public/images/${postId}.jpg`

        file.mv(path, function (err) {
            if (err)
                return res.status(500).send(err);
        });

        res.status(200).json({
            id: postId,
            title: title,
            content: body,
            fileName: postId + ".jpg"
        });

    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error creating post" });
    }
}

/* PUT edit post by id */
//If an input is left blank, no changes will be saved to db and previous value stays unchanged
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
//Deletes text data from db and removes image from /public/images
exports.deletePost = async (req, res) => {
    const postId = req.params.id
    const filePath = `/images/${postId}.jpg`
    try {
        const findPost = await sequelize.query(`SELECT * FROM posts WHERE id = '${postId}'`)
        if (findPost[0].length === 0) {
            res.status(404).send({ message: "Post not found" });
        } else {
            const deletePost = await sequelize.query(`DELETE FROM posts WHERE id = ${postId}`)

            fs.unlink("public" + filePath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

            res.status(200).send({ message: "Post successfully deleted" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: "Error deleting post" });
    }
}