const joi = require('joi');
const db = require('../../utils/database');
const tittle = require('tittle');

module.exports = {
  method: 'GET',
  path: '/posts/{id}',
  config: {
      validate: {
          params: joi.object().keys({
            id: [
                joi.string().required(),
                joi.number().integer().positive().required()
            ]
          })
      }
  },
  handler: async function (req, handler) {

    const query = db.select(
            'posts.id as post_id',
            'posts.title',
            'posts.description',
            'posts.content',
            'posts.created_at as post_created_at',
            'users.id as author_id',
            'users.first_name as author_first_name',
            'users.last_name as author_last_name',
            'comments.id as comment_id',
            'comments.comment')
        .from('posts')
        .innerJoin('users', 'posts.user_id', '=', 'users.id')
        .innerJoin('comments', 'posts.id', '=', '.post_id')
        .where({'posts.id': req.params.id});

    let [posts, error] = await tittle(query);
    if (error) {
        return handler.response({
            statusCode: 400,
            error: 'Something bad happened: + explicit error'
        }).code(400)
    }

    const postsData = {
        id: posts[0].post_id,
        content: posts[0].content,
        description: posts[0].description,
        author: {
            id: posts[0].author_id,
            first_name: posts[0].author_first_name,
            last_name: posts[0].author_last_name
        },
        comments: []
    }

    posts.forEach(post => {
        postsData.comments.push({
            id: post.comment_id,
            comment: post.comment
        })
    })

    return handler.response({
        statusCode: 200,
        data: postsData
    }).code(200)
  }
}
