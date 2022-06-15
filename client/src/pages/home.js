import React from 'react';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';

import ToyCard from '../components/ToyCard';
import { QUERY_ALL_TOYS } from '../utils/queries';

import './home.scss';

export default function Home() {
  // API call to fetch all toys and then splicing it to get the most recent items
  const { data } = useQuery(QUERY_ALL_TOYS);
  const toys = data?.toys || [];
  const toy = toys.slice(-3);

  console.log(toys);

  return (
    <>
      <section className="home">
        <div className="hero-image">
          <div className="container-title">
            <h1 className="title">
              Prime <span>Toys</span>
            </h1>
            <h2 className="subtitle">Trade or donate your toys here</h2>
            <div className="btn-container">
              <button>
                <NavLink to="/Listings">Trade Now</NavLink>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="about-prime-toys">
        <div>
          <h1>The One Stop Toy Site to donate or Trade your toys</h1>
          <h2>Connect with user near you to trade today</h2>
        </div>

        <div className="about-trade-or-free">
          <div className="about-image-trade">
            <h2> Swap</h2>
            <img src="/images/swap.png" alt="a logo symbolizing a swap"></img>
          </div>
          <div className="about-image-free">
            <h2>Donate</h2>
            <img
              src="images/donate-toys.webp"
              alt="a boxfilled with toys. donation is written the box label"
            ></img>
          </div>
        </div>
      </div>
      <div className="recent-container">
        <h3>Check out the recently listed toys</h3>
        {toy.length ? (
          <div className="card-grid recent-card">
            {toy.map((toy) => (
              <ToyCard
                key={toy._id}
                isFree={toy.isFree}
                _id={toy._id}
                name={toy.name}
                description={toy.description}
                image={toy.image}
                category={toy.category.name}
              />
            ))}
          </div>
        ) : (
          <div> There are no current Listings</div>
        )}
      </div>
    </>
  );
}
