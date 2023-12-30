import axios from 'axios';
import apiEndpoints from '../config/ApiConfig';
import  getLocation  from '../services/LocationService';

export const fetchHourlyTemperature = async () => {
  const { latitude, longitude } = await getLocation();
  try {
    const response = await axios.get(apiEndpoints.hourlyTemperature(latitude, longitude));
    return response.data.hourly;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error; 
  }
};
