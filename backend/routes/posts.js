var express = require('express');
var router = express.Router();
const postController = require("../controllers/postController")

/* GET posts listing. */
router.get('/', function (req, res, next) {
  postController.getPosts(req, res, next);  
});

// GET post by id
router.get('/:id', function (req, res, next) {
  postController.getPostById(req, res, next);  
});

/* POST create new post */
router.post("/", function (req, res, next) {
  postController.createPost(req, res, next);
})

/* PUT edit post by id */
router.put("/:id", function (req, res, next) {
  postController.updatePost(req, res, next);
})

/* DELETE delete post by id */
router.delete("/:id", function (req, res, next) {
  postController.deletePost(req, res, next)
})

module.exports = router;
