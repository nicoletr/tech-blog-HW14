const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// Get all posts (READ)
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ['id', 'title', 'body', 'date_created'],
      include: [User],
    });

    const posts = postData.map((post)=> post.get({ plain: true }));
    res.render('all-posts', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get single post (READ)
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [ User,
        {
          model: Comment,
          include: [User]
          
        },
      ]  
    });

    const post = postData.get({ plain: true });
    res.render('post-details', { post });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route (READ login page)
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup route (READ signup page)
router.get('/signup', (req, res) => {
  //TODO: add conditional statement for if email is already in use
  //TODO: conditional statement for if username is taken

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('signup');
});

module.exports = router;