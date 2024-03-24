import React, { useState,  } from 'react';
import "./mainpage.css";

function Application() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      alert('Please upload an image file.');
      return;
    }

    try {
      const prediction = await predict_digit(imageFile); 
      setPrediction(prediction); 
      console.log('Predicted Digit:', prediction);
    } catch (error) {
      console.error(error);
      alert('An error occurred during prediction. Please try again.');
    }
  };



const predict_digit = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const predictionResponse = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!predictionResponse.ok) {
      throw new Error('Failed to predict digit. Please try again.');
    }

    const predictionData = await predictionResponse.json();
    const predictedDigit = predictionData;

    return predictedDigit;
  } catch (error) {
    throw new Error('An error occurred during prediction. Please try again.');
  }
};


  return (
    <div className="Application">
      <h1>Bangla Handwritten Digit Recognition</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageFile">Upload image:</label>
        <input type="file" id="imageFile" onChange={handleImageChange} />
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Uploaded image" />
          </div>
        )}
        <button type="submit">Predict Digit</button>
      </form>
      {prediction && <p>Predicted Digit: {prediction}</p>}
    </div>
  );
}

export default Application;
