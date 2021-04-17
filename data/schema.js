import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag"

import { resolvers } from "./resolvers";

const typeDefs = gql`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: Gender
    email: String
    contacts: [Contact]
  }

  type Alien {
    id: ID
    firstName: String
    lastName: String
    planet: String
  }

  type Contact {
    firstName: String
    lastName: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Query {
    getFriend(id: ID): Friend
    getAlien(id: ID): Alien
    getAliens: [Alien]
  }

  input ContactInput {
    firstName: String
    lastName: String
  }

  input FriendInput {
    id: ID
    firstName: String
    lastName: String
    gender: Gender
    email: String
    contacts: [ContactInput]
  }

  input AlienInput {
    firstName: String
    lastName: String
    planet: String
  }

  type Mutation {
    createFriend(input: FriendInput): Friend
    updateFriend(input: FriendInput): Friend
    deleteFriend(id: ID): Friend
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
