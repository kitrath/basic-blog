const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {
    static getSnippet(text, charIndex) {
        if (!text[charIndex]) {
            return text;
        }
        let index = charIndex;
        while(text[index] !== ' ') {
            index++;
        }
        return text.substring(0, index);
    }
}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        snippet: {
            type: DataTypes.TEXT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                userData.snippet = BlogPost.getSnippet(userData.content, 280);
                return userData;
            },
            beforeUpdate: async (userData) => {
                userData.snippet = BlogPost.getSnippet(userData.content, 280);
                return userData;
            },
        },
        sequelize,
        timestamps: true,
        updatedAt: 'lastUpdated',
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_post',
    }
);

module.exports = BlogPost;