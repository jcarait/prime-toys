import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TOY } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import Category from '../CategoryId';
import Condition from '../ConditionId';
import UploadImage from '../Upload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

import './AddToy.scss';

import {
  QUERY_CATEGORY,
  QUERY_CONDITION,
  GET_USER_LISTINGS,
} from '../../utils/queries';

const AddToy = (data) => {
  // defining the initial state of our add toy form to be blank
  const [toyData, setToyData] = useState({
    name: '',
    description: '',
    image: '',
    category: '',
    condition: '',
  });

  const [imageSelected, setImageSelected] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setImageSelected(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      setPreviewSource(reader.result);
    };
  };

  // creating user notifications based on the listing attempts
  const addNotify = () => {
    toast('listing added successfully');
  };
  const errorNotify = () => {
    toast('listing error, please select all fields');
  };

  // setting the default value for listings of toy to be free if none is specified
  const [isFree, setIsFree] = useState(true);

  // querying the categories for the listing
  const { loading: categoryLoading, data: category } = useQuery(QUERY_CATEGORY);
  const { loading: conditionLoading, data: condition } =
    useQuery(QUERY_CONDITION);

  // changing the state of the free/trade based on the users section
  const handleIsFree = (event) => {
    setIsFree(!isFree);
  };

  // setting the values on the add toy form to the user's entered values
  const handleAddToy = (event) => {
    const { name, value } = event.target;
    setToyData({ ...toyData, [name]: value });
  };

  // calling our add toy mutation, API call
  const [AddToy] = useMutation(ADD_TOY, {
    refetchQueries: [
      { query: GET_USER_LISTINGS }, // DocumentNode object parsed with gql
      'getUserToys', // Query name
    ],
  });

  // using our add toy mutation to make an API call
  const submitToyHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'rtvr2kdz');

    const response = await Axios.post(
      'https://api.cloudinary.com/v1_1/hmpkwjtxf/image/upload',
      formData
    );
    const imageData = response;
    const ImageUrl = response.data.url;
    console.log(imageData);

    try {
      const toyMutationResponse = await AddToy({
        variables: {
          input: {
            name: toyData.name,
            description: toyData.description,
            image: ImageUrl,
            category: { _id: toyData.category },
            isFree: isFree,
            condition: { _id: toyData.condition },
          },
        },
      });
      // returning a notification based on if the API was successful
      addNotify();
    } catch (err) {
      console.error(err);
      errorNotify();
    }
    // returning the state of our form to be blank
    setToyData({
      name: '',
      description: '',
      image: '',
      category: '',
      condition: '',
    });
  };

  if (categoryLoading || conditionLoading) return <div> Loading ... </div>;

  const categoryData = category?.categories || [];
  const conditionData = condition?.conditions || [];

  return (
    <div className="toy-form">
      <div className="toy-form-header">
        <h1>Add a new Toy</h1>
        <p>Please input the following fields to add a new listing</p>
      </div>
      <form onSubmit={submitToyHandler}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <div className="input-fields">
          <div className="listing-option">
            <input type="radio" name="option" onClick={handleIsFree} /> list for
            free
            <input type="radio" name="option" onClick={handleIsFree} /> list for
            trade
          </div>
          <label htmlFor="toyName" className="name-label">
            Name:
          </label>
          <input
            className
            type="text"
            name="name"
            onChange={handleAddToy}
            value={toyData.name}
            required
          ></input>
          <label htmlFor="toyDescription">Description:</label>
          <input
            type="text"
            name="description"
            onChange={handleAddToy}
            value={toyData.description}
            required
          ></input>
          <label htmlFor="toyImage">Image:</label>
          {/* <input
            type="text"
            name="image"
            onChange={handleAddToy}
            value={toyData.image}
            required
          ></input> */}
          <UploadImage
            inputChange={handleFileInputChange}
            preview={previewSource}
          />
          <label>
            Category:
            <select
              className="render-categoryOptions"
              name="category"
              onChange={handleAddToy}
              required
            >
              <option value="">Choose one</option>
              {categoryData.length &&
                categoryData.map((category) => (
                  <Category
                    key={category._id}
                    category={category.name}
                    id={category._id}
                  />
                ))}
            </select>
          </label>
          <label>
            Condition:
            <select
              className="render-categoryOptions"
              name="condition"
              onChange={handleAddToy}
              required
            >
              <option value="">Choose one</option>
              {conditionData.length &&
                conditionData.map((condition) => (
                  <Condition
                    key={condition._id}
                    condition={condition.name}
                    id={condition._id}
                  />
                ))}
            </select>
          </label>
          <div className="submit-btn-container">
            <input type="submit" className="submit-btn" value="Submit"></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddToy;
