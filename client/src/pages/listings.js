import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import './listings.scss';

import ToyCard from '../components/ToyCard';

import { QUERY_ALL_TOYS } from '../utils/queries';

export default function Listings() {
  // defaults the filter to be all
  const [activeFilter, setActiveFilter] = useState('all');

  // querying our API to fetch all toys on the database
  const { data } = useQuery(QUERY_ALL_TOYS);
  const toys = data?.toys || [];
  const [toyData, setToyData] = useState(toys);

  // refreshes the page to ensure all toys are loaded
  useEffect(() => {
    if (data) {
      setToyData(data.toys);
    }
  }, [data]);

  // handler function to update the filtering
  const handleFilter = function (event) {
    const { value } = event.target;
    setActiveFilter(value);

    if (value === 'all') {
      return setToyData(toys);
    }

    if (value === 'true') {
      const isFree = toys.filter((toy) => {
        return !!toy.isFree;
      });

      setToyData(isFree);
    }

    if (value === 'false') {
      const isTradeable = toys.filter((toy) => {
        return !toy.isFree;
      });

      setToyData(isTradeable);
    }
  };
  return (
    <>
      <div className="filter-container">
        <h2>Select a Listing Type</h2>
        <div className="filter-btn-container">
          <button value="all" onClick={handleFilter}>
            All Listing
          </button>
          <button value="true" onClick={handleFilter}>
            Free
          </button>
          <button value="false" onClick={handleFilter}>
            Trade
          </button>
        </div>
      </div>
      <section className="wrapper--listings">
        {toyData.length ? (
          <div className="card-grid">
            {toyData.map((toy) => (
              <ToyCard
                key={toy._id}
                isFree={toy.isFree}
                _id={toy._id}
                name={toy.name}
                description={toy.description}
                image={toy.image}
                category={toy.category.name}
                condition={toy.condition.name}
              />
            ))}
          </div>
        ) : (
          <div> There are no current Listing / select a type of listing </div>
        )}
      </section>
    </>
  );
}
