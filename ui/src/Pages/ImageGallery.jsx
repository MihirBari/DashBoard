import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the server
    axios.get(`${API_BASE_URL}/api/prod/sendImage`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Product Gallery</h1>
      <div className="image-container">
        {images.map((image) => (
          <Link to={`/product/${image.product_id}`} key={image.product_id}>
            <ProductImage product_image={image.image} product_id={image.product_id} />
          </Link>
        ))}
      </div>
    </div>
  );
};

const ProductImage = ({ product_image, product_id }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    try {
      // Convert ArrayBuffer to base64
      const base64Image = arrayBufferToBase64(product_image);
      setImageSrc(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }, [product_image]);

  return (
    <img
      src={imageSrc}
      alt={`Product ${product_id}`}
      style={{ width: '150px', height: '150px', margin: '10px' }}
    />
  );
};

// Function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export default ImageGallery;
