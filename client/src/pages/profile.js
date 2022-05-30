import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NavLink } from 'react-router-dom';

import './profile.scss';

import AddToy from '../components/AddToy';
import ToyCards from '../components/ToyCard';

import { QUERY_USER, QUERY_CATEGORY } from '../utils/queries';
import { REMOVE_TOY } from '../utils/mutations';

export default function Profile({ listings }) {
  const GET_USER_LISTINGS = gql`
    {
      user {
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

  const DELETE_LISTING = gql`
    mutation deleteListing($id: ID) {
      removeToy(_id: $id) {
        _id
      }
    }
  `;
  // using our API to query our database for users which contain all their listings
  const { loading, data, error } = useQuery(GET_USER_LISTINGS, {
    variables: { listings },
  });

  const [removeToy, { loading: deletingListing, error: deleteListingError }] =
    useMutation(DELETE_LISTING);

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const user = data?.user.listings || [];

  const removeToyHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(`value: ${value}`);
    removeToy({
      variables: {
        _id: value,
      },
      optimisticResponse: true,
      update: (cache) => {
        const existingListings = cache.readQuery({
          query: GET_USER_LISTINGS,
        });
        const updatedListings = existingListings.user.listings.filter(
          (listing) => listing._id !== value
        );
        console.log(existingListings.user.listings);
        cache.writeQuery({
          query: GET_USER_LISTINGS,
          data: { user: { listings: updatedListings } },
        });
      },
    });
  };

  return (
    <div className="profile-container">
      <div className="greeting">
        <h1>
          {' '}
          Welcome back <span></span>!
        </h1>
      </div>
      <div className="add-toy-form-container">
        <AddToy />
      </div>
      {user.length ? (
        <div className="card-grid profile-card-grid">
          {user.map((listing) => (
            <ToyCards
              key={listing._id}
              id={listing._id}
              name={listing.name}
              description={listing.description}
              image={listing.image}
              onClickRemove={removeToyHandler}
            />
          ))}
        </div>
      ) : (
        <div className="no-listings">
          <h1 className="list-toys-prompt">
            Listing some toys to get started or
          </h1>
          <button className="btn view-listings">
            <NavLink to="/listings">View Current Listings</NavLink>
          </button>
        </div>
      )}
    </div>
  );
}
