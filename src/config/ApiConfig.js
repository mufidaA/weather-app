const baseUrl = 'https://api.open-meteo.com/v1/forecast';

const apiEndpoints = {
  hourlyTemperature: (latitude, longitude) => `${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`,
};

export default apiEndpoints;