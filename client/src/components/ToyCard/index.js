import React from 'react';
import { useMatch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import './ToyCard.scss';

export const ToyContext = React.createContext();

export default function ToyCard(card) {
  // deconstructing the parameters passed to ToyCard
  const {
    id,
    name,
    image,
    category,
    isFree,
    condition,
    update,
    onClickRemove,
  } = card;
  // calling our remove API
  // notifies user that a toy was successfully removed

  const ProfileCardButtons = () => {
    const match = useMatch('/profile');
    // specifying the buttons on the toy card based on which page the user on viewing
    if (match) {
      return (
        <div className="card-footer">
          <button className="btn">Update</button>
          <button
            className="btn btn-outline"
            name="remove-btn"
            value={id}
            onClick={onClickRemove}
          >
            Remove
          </button>
        </div>
      );
    } else {
      return (
        <div className="card-footer">
          <button className="btn btn-details">
            <NavLink to="/details">Details</NavLink>
          </button>
          <button className="btn btn-outline">Trade</button>
        </div>
      );
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <img alt={name} tabIndex={0} src={`${image}`} />
      </div>

      <div className="card-body">
        <div className="card-text">
          <p className="toy-name">{name}</p>
          <div className="text-float-left">
            <p className="toy-description">{category}</p>
          </div>
          <div className="text-float-right">
            <p className="post-time">Posted 1 hr ago</p>
            {isFree ? (
              <p className="free-status">Free</p>
            ) : (
              <p className="free-status tradeable">Tradeable</p>
            )}
          </div>
        </div>
        <ProfileCardButtons />
      </div>
    </div>
  );
}
