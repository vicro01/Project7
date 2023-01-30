const db = require("../database_connect");

//test 
exports.test = (req, res, next) => {
    res.json({ message: 'Your request has been received !' }); 
}

// All posts
exports.getAllPost = (req, res, next) => {
  db.query('SELECT * FROM posts', (error, result) => {
      if (error) {
          return res.status(400).json({
              message: 'error!'
          });
      }
      return res.status(200).json(result);
  });
};
// NewPost
exports.newPost = (req, res, next) => {
    console.log('line 21', req.body)
    let imageUrl = '';
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    else {
        imageUrl = req.body.media;
    }
    
    db.query(`INSERT INTO posts (post_author_id, post_title, post_text, post_img) VALUES ('${req.body.id_user}', '${req.body.titre}', '${req.body.texte}', 
      '${imageUrl}')`, (error, result, field) => {
      if (error) {
        console.log('this is hit', error)
          return res.status(400).json({
            error
          });
      }
      return res.status(201).json({
          message: 'Your post has been published !'
      })
  });
};
// OnePost
exports.getOnePost = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE post_id = ${req.params.id}`, (error, result, field) => {
    // SELECT users.id, users.username, comments.id,comments.texte, comments.id_user FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ${req.params.id}   
    if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Delete OnePost
exports.deleteOnePost = (req, res, _next) => {
    db.query(`DELETE FROM comments WHERE comments.commented_post_id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
    });
  
  db.query(`DELETE FROM posts WHERE post_id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
  db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// New comment
exports.newComment = (req, res, next) => {
    console.log(req.body)
  db.query(`INSERT INTO comments (commented_post_id, comment_text, comment_date, user_id) VALUES ('${req.body.post_id}', '${req.body.texte}', NULL, '${req.body.id_user}')`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Get all comments
exports.getAllComments = (req, res, next) => {
  db.query(`SELECT users.id, users.email, comments.comment_id, comments.comment_text, comments.user_id FROM users INNER JOIN comments ON users.id = comments.user_id WHERE comments.commented_post_id = ${req.params.id} `,
      (error, result, field) => {
          if (error) {
              return res.status(400).json({
                  error
              });
          }
          return res.status(200).json(result);
      });
};
//Delete comment
exports.deleteComment = (req, res, next) => {
  db.query(`DELETE FROM comments WHERE comments.comment_id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};