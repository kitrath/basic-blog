const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

module.exports = router;

// req.body = {title, content}
router.post('/', withAuth, async (req, res) => {
    try {
        const blogPost = await BlogPost.create(req.body);
        
        if (blogPost) {
            res.status(201).json({
                success: true,
                message: `Successfully created blog post with id ${blogPost.id}`
            });
        } else {
            res.status(400).json({
                success: false,
                message: `Something went wrong.`
            });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const updatedBlogPost = BlogPost.update(req.body, {
            where: {
                id: blogPostId,
            }
        });

        if (!updatedBlogPost) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        } 

        res.status(200).json({
            success: true,
            message: `Successfully updated blog post with id ${blogPostId}`
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostId = req.params.id;
        const blogPost = await BlogPost.destroy({
            where: { id: blogPostId },
        });

        if (!blogPost) {
            res.status(404).json({ success: false, message: 'Not found' });
            return;
        } else {

        }
    }
});