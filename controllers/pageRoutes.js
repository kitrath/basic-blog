const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attibutes: ['id', 'title', 'snippet', 'createdAt'],
            include: [{ model: User, attributes: ['name'] }],
        });

        const blogPosts = blogPostData.map((blogPost) => {
            return blogPost.get({ plain: true }); 
        });
        // TODO: Remove
        console.log(blogPosts);
        
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { 
                    model: Comment,
                    include: [{ model: User, attributes: ['name'] }],
                },
            ],
        });
        // TODO: Redirect to 404 on id not found 
        const blogPost = blogPostData.get({ plain: true });

        // TODO: Remove
        console.log(blogPost);

        res.render('blogpost', {
            ...blogPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If user logged in, redirect to dashboard
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;