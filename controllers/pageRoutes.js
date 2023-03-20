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

module.exports = router;