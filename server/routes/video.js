import express from 'express'
import { verifyToken } from '../verifyToken.js';
import { uploadVideo , deleteVideo , getUserVideos , getVideo ,incView, random, getSubVideos, trending, tags , search } from '../controllers/video.js';

const router = express.Router();

router.post('/upload' , verifyToken ,uploadVideo)
router.delete('/delete/:videoId' , verifyToken ,deleteVideo)
router.get('/getVideo/:videoId' , getVideo)
router.get('/userVideos/:userId' , getUserVideos)
router.put('/view/:videoId' , incView)
router.get('/random' , random)
router.get('/subscription' , verifyToken , getSubVideos)
router.get('/trending' , trending)
router.get('/tags' , tags)
router.get('/search/:q' , search)

export default router