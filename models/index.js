const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
});
BlogPost.belongsTo(User, {
    foreign_key: 'user_id',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'blog_post_id',
    // When a blog post is deleted, delete its comments
    onDelete: 'CASCADE',
});
Comment.belongsTo(BlogPost);

User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, BlogPost, Comment };