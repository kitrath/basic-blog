const sequelize = require('../config/connection');
const { User, Comment, BlogPost } = require('../models');

const userData = require('./users.json');
const blogPostData = require('./blog-posts.json');
const commentData = require('./comments.json');

const seedDb = async () => {
    
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        // will run hooks to encrypt password
        individualHooks: true,
        // run 'RETURNING' sql statement to get back 
        // created values w/o and additional 'SELECT'
        returning: true,
    });

    const blogPosts = await BlogPost.bulkCreate(blogPostData, {
        // create snippets
        individualHooks: true,
        returning: true,
    });

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            blog_post_id: blogPosts[Math.floor(Math.random() * blogPosts.length)].id,
        });
    }

    process.exit(0);
}

seedDb();