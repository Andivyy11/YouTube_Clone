import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { addComment , deleteComment , getAllComments , editComment, getComment} from '../controllers/comment.js';

const router = express.Router();

router.post('/' , verifyToken ,  addComment)
router.delete('/:id' , verifyToken , deleteComment)
router.get('/:videoId', getAllComments)
router.put('/:id', editComment)
router.get('/aComment/:id' , getComment)

export default router;

