import React from 'react';
import './conditionId.scss';

export default function ConditionOptions(data) {
  return <option value={data.id}>{data.condition}</option>;
}
