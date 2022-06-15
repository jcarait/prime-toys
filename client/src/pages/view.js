import React, { useState } from 'react';

import Listings from './listings';

export default function View() {
  const [toyID, setToyID] = useState('');
  return <Listings />;
}
