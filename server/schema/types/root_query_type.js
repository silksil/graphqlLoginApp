const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // The request get it's properties automatically placed by passport
        // when we authenticate a user. Thus, when authenticated, it should have a `req.user`
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
