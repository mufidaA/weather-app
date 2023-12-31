export const isTemperatureBelowThreshold = (unit, currentTemperature) => {
  if (unit === "°C") {
    return currentTemperature < -5;
  } else if (unit === "°F") {
    const thresholdFahrenheit = (parseFloat(-5) * 9/5) + 32;
    return currentTemperature < thresholdFahrenheit;
  }
  return false;
};
