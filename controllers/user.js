import { createError } from '../error.js'
import User from '../models/User.js'
import Video from '../models/Video.js'

export const getUser = async (req, res) => {
  try {
    const fetchedUser = await User.findById(req.params.id)
    if (!fetchedUser)
      res.status(404).send("User not found")
    else
      res.status(200).json(fetchedUser)
  }
  catch (err) {
    res.status(500).json(err)
  }

}

export const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(
        req.params.id,
        { new: true }
      );
      res.status(200).json(deletedUser);
    } catch (err) {
      next(err);
    }
    res.json('authorized')
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
}

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
    res.json('authorized')
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const subscribe = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, { $push: { subscribed: req.params.id } })
        await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 } })
        res.status(200).json(updatedUser)
    }
    catch (err) {
      next(err)
    }
  }

export const unsubscribe = async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, { $pull: { subscribed: req.params.id } })
      await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 } })
      res.status(200).json(updatedUser)
    }
    catch (err) {
      next(err)
    }
}

export const likeVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.vid , {
      $addToSet:{likes: req.user.id},
      $pull:{ dislikes: req.user.id}
    })
    res.status(200).json("liked the video")
  }
  catch (err) {
     next(err)
  }
}

export const dislikeVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.vid , {
      $addToSet:{dislikes: req.user.id},
      $pull:{ likes: req.user.id}
    })
    res.status(200).json("disliked the video")

  }
  catch (err) {
     next(err)
  }
}