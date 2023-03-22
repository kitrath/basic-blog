const router = require('express').Router()
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // TODO: validate email format, passwords match
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
        });

        res.status(200).json(newUser);
    } catch (err) {
        console.error(err);

        if (err instanceof SequelizeUniqueConstraintError) {
            req.status(400).json({
                message: 'Username or email address already in use.'
            });
            return;
        }
        res.status(500).json(err); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { name: req.body.username }});

        if (!user) {
            res.status(400).json({
                message: 'Invalid username or password.  Please try again'
            });
            return;
        }

        const isValidPassword = await user.checkPassword(req.body.password);

        if (!isValidPassword) {
            res.status(400).json({
                message: 'Invalid username or password.  Please try again.'
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
        });

        res.status(200).json({ user, message: 'Successfully logged in!' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;