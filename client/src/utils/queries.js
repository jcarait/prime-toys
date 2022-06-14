import { gql } from '@apollo/client';
// defining our query API
export const QUERY_ALL_TOYS = gql`
  {
    toys {
      _id
      name
      description
      image
      category {
        _id
        name
      }
      condition {
        _id
        name
      }
      createdAt
      isFree
    }
  }
`;
export const QUERY_USER = gql`
  {
    user {
      _id
      username
      email
      listings {
        _id
        name
        description
        image
        createdAt
        isFree
        category {
          _id
        }
        condition {
          _id
        }
      }
    }
  }
`;

export const QUERY_CATEGORY = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CONDITION = gql`
  {
    conditions {
      _id
      name
    }
  }
`;

export const QUERY_USER_TOYS = gql`
  query getUserToys($user: ID) {
    toy(user: $user) {
      _id
      name
      description
      image
      createdAt
      isFree
      category {
        name
      }
    }
  }
`;

export const GET_USER_LISTINGS = gql`
  query getUser {
    user {
      _id
      username
      listings {
        _id
        name
        description
        image
        createdAt
        isFree
        category {
          _id
        }
        condition {
          _id
        }
      }
    }
  }
`;
