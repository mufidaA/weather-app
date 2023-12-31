import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchHourlyTemperature } from '../services/ApiService';
import {convertTemperature} from '../services/ConversionService';
import { useToggleContext } from './ToggleContext';


const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateData = useCallback((newData) => {
    setData(newData);
    sessionStorage.setItem('data', JSON.stringify(newData));
  }, []);
  
  const updateLocalStorage = useCallback((newData) => {
    localStorage.setItem('data', JSON.stringify(newData));
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
        const response = await fetchHourlyTemperature();
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