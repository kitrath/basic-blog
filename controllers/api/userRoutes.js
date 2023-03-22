const router = require('express').Router()
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            
            res.status(201).json({
                user: newUser,
                message: `Successfully created user ${newUser.name}`
            });
        });

    } catch (err) {
        console.error(err);

        if (err.name ==  'SequelizeUniqueConstraintError') {
            res.status(400).json({
                message: 'Username already in use.'
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
            
            res.status(200).json({ user, message: 'Successfully logged in!' });
        });

       
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;