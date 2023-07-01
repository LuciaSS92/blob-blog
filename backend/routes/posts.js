var express = require('express');
var router = express.Router();
const postController = require("../controllers/postController")

/* GET posts listing. */
router.get('/', function (req, res, next) {
  postController.getPosts(req, res, next);
  // res.send('respond with a resource');
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

// router.post("/holi", function (req, res) {
//   console.log(req.files)

//   if (req.files === null){
//     return
//   }
//   if (!req.files || Object.keys(req.files).length === 0) {
//     // return res.status(400).send('No files were uploaded.');
//     console.log("no files uploaded")
//   }
//   let file = req.files.archivo
//   let path = `${__dirname}/../public/images/${file.name}`

//   file.mv(path, function(err) {
//     if (err)
//       return res.status(500).send(err);

//     res.send('File uploaded!');
//   });
// })

module.exports = router;
