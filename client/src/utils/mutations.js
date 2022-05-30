import { gql } from '@apollo/client';
// defining our mutation API
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: addUser) {
    addUser(input: $input) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TOY = gql`
  mutation AddToy($input: addToy) {
    addToy(input: $input) {
      _id
      name
      description
      image
      isFree
      category {
        _id
      }
      condition {
        _id
      }
    }
  }
`;

export const DELETE_LISTING = gql`
  mutation deleteListing($id: ID) {
    removeToy(_id: $id) {
      _id
    }
  }
`;
