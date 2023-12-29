const getLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            //reject(error);
            resolve({ latitude: 65.01221, longitude: 25.46164 });
          }
        );
      } else {
        //reject(new Error('Geolocation is not supported by this browser.'));
        resolve({ latitude: 65.01221, longitude: 25.46164 });
      }
    });
  };
  
  export default getLocation;