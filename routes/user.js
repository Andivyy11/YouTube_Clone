import express from 'express'
import { getUser , updateUser , deleteUser , subscribe , unsubscribe , likeVideo, dislikeVideo } from '../controllers/user.js'
import { verifyToken} from '../verifyToken.js'

const router = express.Router();

router.get('/:id' , getUser)

router.put('/:id' , verifyToken, updateUser)

router.delete('/:id' , verifyToken , deleteUser)

router.put('/subscribe/:id' ,verifyToken, subscribe)

router.put('/unsubscribe/:id' ,verifyToken, unsubscribe)

router.put('/like/:vid' ,verifyToken, likeVideo)

router.put('/dislike/:vid' ,verifyToken, dislikeVideo)

export default router