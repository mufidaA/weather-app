import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchHourlyTemperature } from '../services/apiService';
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

  const { isOn } = useToggleContext();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const latitude = 65.01221;
        const longitude = 25.46164;

        const response = await fetchHourlyTemperature(latitude, longitude);
        if ( isOn ) {
          const fTemperature = response.temperature_2m.map((celsius) => ((celsius * 9) / 5 + 32).toFixed(1));
          const convertedData = {
            time: response.time,
            temperature_2m: fTemperature,
          };
          console.log('Updated Data:', convertedData);
          updateData(convertedData);

        }
        else {updateData(response);}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isOn, updateData]);

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