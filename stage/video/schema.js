const {buildSchema} = require("graphql");

const mockDatabase = require("./data");

const schema = buildSchema(`
    type Comment {
        id: Int,
        avatar: String,
        name: String,
        isTop: Boolean,
        content: String,
        publishDate: String,
        commentNum: Int,
        praiseNum: Int
    }
    type Query {
        comments: [Comment]
    }
    type Mutation {
        praise(id: Int!): Int!
    }
`);

schema.getQueryType().getFields().comments.resolve = () => {
    return Object.entries(mockDatabase).map(([, value]) => value);
};

schema.getMutationType().getFields().praise.resolve = (source, args) => {
    const {id} = args;
    const mockDatabaseArray = Object.values(mockDatabase);
    const mockDatabaseObj = mockDatabaseArray.find(mockDatabaseItem => mockDatabaseItem.id === id);
    mockDatabaseObj.praiseNum++;
    return mockDatabaseObj.praiseNum;
};

module.exports = schema;
