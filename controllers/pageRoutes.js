const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await PromiseRejectionEvent.findAll({
            attibutes: ['id', 'title', 'snippet', 'createdAt'],
            include: [{ model: User, attributes: ['name'] }],
        });

        const blogPosts = blogPostData.map((blogPost) => {
            return blogPost.get({ plain: true }); 
        });
    
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;