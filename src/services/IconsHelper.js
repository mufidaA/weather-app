export const isTemperatureBelowThreshold = (unit, currentTemperature) => {
    if (unit === "°C") {
      return currentTemperature < -5;
    } else if (unit === "°F") {
      return currentTemperature < 23;
    }
    return false;
  };
  
