import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchHourlyTemperature } from '../services/apiService';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateData = useCallback((data) => {
    setData(data);
    localStorage.setItem('data', JSON.stringify(data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latitude = 65.01221;
        const longitude = 25.46164;

        const response = await fetchHourlyTemperature(latitude, longitude);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
