export const convertTemperature = (data) => {
  return {
    time: data.time,
    temperature_2m: data.temperature_2m.map((celsius) => parseFloat(((celsius * 9) / 5 + 32).toFixed(1))),
  };
};