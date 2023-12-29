import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchHourlyTemperature } from '../services/ApiService';
import {convertTemperature} from '../services/ConversionService';
import  getLocation  from '../services/LocationService';
import { useToggleContext } from './ToggleContext';


const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateData = useCallback((data) => {
    setData(data);
    sessionStorage.setItem('data', JSON.stringify(data));
  }, []);
  
  const updateLocalStorage = useCallback((data) => {
    localStorage.setItem('data', JSON.stringify(data));
  }, []);

  const { isOn } = useToggleContext();


  const handleFetchError = (error, isOn, setData) => {
    console.error('Error fetching data:', error);
    const storedData = localStorage.getItem('data');
    const parsedData = JSON.parse(storedData);
    if (storedData && isOn) {
      const convertedData = convertTemperature(parsedData);
      setData(convertedData);
    } else {
      setData(parsedData);
    }
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const { latitude, longitude } = await getLocation();

        console.log('Location:', { latitude, longitude }); 

        const response = await fetchHourlyTemperature(latitude, longitude);
        isOn ? updateData(convertTemperature(response)) : updateData(response);
      } catch (error) {
        handleFetchError(error, isOn, setData);
      }
    };

    fetchData();
  }, [isOn, updateData, updateLocalStorage]);

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  return useContext(DataContext);
};

export { DataProvider, useDataContext };