const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID,
        name: String
        genre: String
        author: Author
    }
    type Author {
        id: ID!,
        name: String,
        age: Int,
        books: [Book]
    }
    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        addBook(name: String!, genre: String!): Book
      }
`;

const books = [
    {
        id: 1,
        name: 'De men phieu luu ky',
        genre: 'Adventure',
        authorId: 1
    },
    {
        id: 2,
        name: 'Lam giau khong kho',
        genre: 'Education',
        authorId: 2
    },
    {
        id: 3,
        name: 'So Do',
        genre: 'Adventure',
        authorId: 3
    },
    {
        id: 4,
        name: 'Song Mon',
        genre: 'Education',
        authorId: 2
    }
];

const authors = [
    {
        id: 1,
        name: 'Ngo Tat To',
        age: 127
    },
    {
        id: 2,
        name: 'Nam Cao',
        age: 106
    },
    {
        id: 3,
        name: 'Vu Trong Phong',
        age: 109
    }
];

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id.toString() === args.id),
        authors: () => authors,
        author: (parent, args) => authors.find(author => author.id.toString() === args.id),

    },
    Book: {
        author: (parent, args) => {
            return authors.find(author => author.id === parent.authorId)

        }
    },
    Author: {
        books: (parent, args) =>
            books.filter(book => book.authorId === parent.id)

    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer();

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
