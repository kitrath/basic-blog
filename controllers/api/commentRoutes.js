const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content.trim(),
            user_id: req.session.user_id,
            blog_post_id: req.session.blog_post_id
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});
module.exports = router;

