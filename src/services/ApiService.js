import axios from 'axios';
import apiEndpoints from '../config/ApiConfig';

export const fetchHourlyTemperature = async (latitude, longitude) => {
  try {
    const response = await axios.get(apiEndpoints.hourlyTemperature(latitude, longitude));
    return response.data.hourly;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error; 
  }
};
