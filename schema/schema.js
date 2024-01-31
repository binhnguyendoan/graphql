const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID,
        name: String
        gerne: String
    }
    # ROOT TYPE
    type Query {
        books: [Book]
    }
`
module.exports = typeDefs