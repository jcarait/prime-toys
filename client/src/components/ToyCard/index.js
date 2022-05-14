import React from 'react';
import { Link } from 'react-router-dom';

import './ToyCard.scss';

export default function ToyCard(card) {
  const { _id, name, description, image, category } = card;

  return (
    <div className="card">
      <div className="card-image">
        <img alt={name} tabIndex={0} src={`/images/${image}`} />
      </div>

      <div className="card-body">
        <div className="card-text">
          <p className="toy-name">{name}</p>
          <p className="toy-description">{category}</p>
        </div>
        <div className="card-footer">
          <button className="btn">Details</button>
          <button className="btn btn-outline">Trade</button>
        </div>
      </div>
    </div>
  );
}
