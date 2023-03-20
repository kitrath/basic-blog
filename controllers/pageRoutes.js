const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = reqire('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const BlogPostData = await PromiseRejectionEvent.findAll({
            attibutes: ['id', 'title', 'snippet', 'createdAt'],
            include: [{ model: User, attributes: ['name'] }],
        });
    }
})