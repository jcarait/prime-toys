import React, { useEffect, useState } from 'react';

export default function UploadImage(props) {
  const { inputChange, preview } = props;

  return (
    <>
      <input type="file" onChange={inputChange}></input>
      {preview && (
        <img src={preview} alt="chosen" style={{ height: '300px' }}></img>
      )}
    </>
  );
}
