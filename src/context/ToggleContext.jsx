import { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggleContext must be used within a ToggleProvider');
  }
  return context;
};

export const ToggleProvider = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const [unit, setUnit] = useState("°C");

  const toggleSwitch = () => {
    setIsOn((prevIsOn) => !prevIsOn);
    setUnit((prevUnit) => (prevUnit === "°C" ? "°F" : "°C"));
  };

  const contextValue = {
    isOn,
    unit,
    toggleSwitch,
  };

  return (
    <ToggleContext.Provider value={contextValue}>
      {children}
    </ToggleContext.Provider>
  );
};
