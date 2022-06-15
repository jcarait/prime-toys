import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './profile.scss';

import AddToy from '../components/AddToy';
import ToyCards from '../components/ToyCard';

import { QUERY_ALL_TOYS } from '../utils/queries';
import { DELETE_LISTING } from '../utils/mutations';

export default function Profile({ listings, _id }) {
  const GET_USER_LISTINGS = gql`
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
            name
          }
          condition {
            _id
            name
          }
        }
      }
    }
  `;

  const {
    loading,
    data: user,
    error,
  } = useQuery(GET_USER_LISTINGS, {
    variables: { listings },
  });

  const { refetch } = useQuery(QUERY_ALL_TOYS, {
    variables: { _id },
  });

  const [removeToy] = useMutation(DELETE_LISTING);

  const userListings = user?.user.listings || [];

  console.log(userListings);

  const removeNotify = () => {
    toast(`Listing removed successfully`);
  };

  const removeToyHandler = (e) => {
    const { value } = e.target;
    removeToy({
      variables: {
        id: value,
      },
      optimisticResponse: true,
      update: (cache) => {
        const existingUserListings = cache.readQuery({
          query: GET_USER_LISTINGS,
        });
        const username = existingUserListings.user.username;
        const id = existingUserListings.user._id;
        const updatedUserListings = existingUserListings.user.listings.filter(
          (listing) => listing._id !== value
        );
        const updatedData = {
          user: {
            username: username,
            listings: updatedUserListings,
            _id: id,
          },
        };
        const existingListings = cache.readQuery({
          query: QUERY_ALL_TOYS,
        });
        const updatedListings = existingListings.toys.filter(
          (listing) => listing._id !== value
        );

        cache.writeQuery(
          {
            query: GET_USER_LISTINGS,
            data: { ...existingUserListings, ...updatedData },
          },
          {
            query: QUERY_ALL_TOYS,
            data: { toys: [existingListings, updatedListings] },
          }
        );
      },
    });
    removeNotify();
  };

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <Navigate to="/Login" />;
  }

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
      {userListings.length ? (
        <div className="card-grid profile-card-grid">
          {userListings.map((listing) => (
            <ToyCards
              key={listing._id}
              id={listing._id}
              name={listing.name}
              description={listing.description}
              image={listing.image}
              category={listing.category.name}
              isFree={listing.isFree}
              posted={listing.createdAt}
              onClickRemove={(e) => {
                removeToyHandler(e);
                refetch({ _id });
              }}
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
