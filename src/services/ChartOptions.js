export const options = {  
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        mode: 'index',
      },
      title: {
        display: true,
        text: 'Temperature Chart',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          minUnit: 'hour',
          parser: 'YYYY-MM-DDTHH:mm',
          displayFormats: {
            day: 'MMM DD',
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature',
        },
      },
    },
  };