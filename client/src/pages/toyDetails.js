import React from 'react';
import './toyDetails.scss';
import { NavLink } from 'react-router-dom';

export default function Details() {
  return (
    <div className="item-detail-container">
      <div className="item-detail">
        <div className="item-image">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLSoDONs0ZJI2OUsZBVFV1gwgHvKNl-AlzwcfY9h1w=s900-c-k-c0x00ffffff-no-rj"
            alt="placeholder"
          ></img>
        </div>
        <div className="item-text">
          <div className="overview">
            <h3>item name</h3>
            <span>item free</span>
          </div>
          <p>
            item description item descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem descriptionitem descriptionitem descriptionitem
            descriptionitem description
          </p>
          <p>item condition</p>
        </div>
        <div className="toy-btn-container">
          <button className="btn trade-btn">Trade</button>
          <NavLink to="/Listings">
            <button className="btn btn-outline">Go back to Listings</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
