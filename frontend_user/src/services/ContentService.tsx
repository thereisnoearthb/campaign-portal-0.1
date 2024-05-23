import axios from 'axios';

const API_URL = 'http://localhost:5000/api/content';

// export const getContent = () => axios.get(API_URL);

export const getContent = async () => {
    try {
      const response = await axios.get(API_URL);
      return response;
    } catch (error) {
      console.error('Error during fetching: ', error);
      return null;
    }
  };