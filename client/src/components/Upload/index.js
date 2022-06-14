import React, { useState } from 'react';
import Axios from 'axios';

export default function UploadImage() {
  const [imageSelected, setImageSelected] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [imageAltText, setImageAlt] = useState('');

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'rtvr2kdz');

    Axios.post(
      'https://api.cloudinary.com/v1_1/hmpkwjtxf/image/upload',
      formData
    ).then((response) => {
      setImageValue(response.data.url);
      setImageAlt(response.data.original_filename);
    });
  };

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      ></input>
      <button type="button" onClick={uploadImage}>
        Upload
      </button>
      <img src={imageValue} alt={imageAltText}></img>
    </>
  );
}
