const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {where: { id: req.params.id } });

    if (affectedRows > 0) {
      res.status(200).end();

    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy(req.body, {where: { id: req.params.id } });

    if (affectedRows > 0) {
      res.status(200).end();

    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;