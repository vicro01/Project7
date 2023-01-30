const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

//Posts
router.get('/test', postCtrl.test);
router.get('/',  postCtrl.getAllPost);  //auth
router.post('/', auth, multer, postCtrl.newPost);     //auth
router.get('/:id',  postCtrl.getOnePost);//auth,
router.delete('/:id',  postCtrl.deleteOnePost); //auth,
router.put('/:id', auth, postCtrl.modifyOnePost);
router.get('/user:id/posts', auth, postCtrl.getUserPosts);
//Comments
router.get('/:id/comments',  postCtrl.getAllComments);          //auth,
router.post('/:id/comment/', postCtrl.newComment);        //auth,
router.delete('/comment/:id', postCtrl.deleteComment);    //auth,

module.exports = router;