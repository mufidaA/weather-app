# Project-Assignment: Weather Application in React

## Overview
A straightforward web application developed in ReactJS that retrieves and visualizes weather data from the provided Open Meteo API.
[data source](https://open-meteo.com/en/docs#latitude=65.01&longitude=25.47&hourly=temperature_2m)

### Tech Stack
Framework: ReactJS
Project Setup: Vite (recommended project setup)
Styling: Primarily implemented with Tailwind CSS (recommended CSS framework)
Language: JavaScript
The app is accessible on the internet at [weather-app](https://mufidaa.github.io/weather-app/).

![preview  of the app](public/weather2023-12-30%2017-56.gif)


## Technical Requirements: Status

| Requirements                                                 | Classification |Status |
| -------------------------------------------------------------|----------------|----------|
| Visualisation of Temperature hourly Changes Over Time  Chart | required       | done     |
| Temperature Unit Toggle Button (Defaulting to C to F)        | required       | done     |
| Good-looking UI and Responsive Layout: required              | required       | done     |
| Deployment to Internet: required                             | required       | done     |

### Additional Feature
Geolocation-Based Retrieval: The app reads the browser's location with permission and adds it as parameters for longitude and latitude in the API query.
API Query: `${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`

## Main Components & Data Management
### Header component:
Includes the button for toggling temperature units (Celsius/Fahrenheit). The conversion is user-controlled, with the ToggleContext storing the state of the toggle button.

### Current Weather component:
Component for displaying the current day, date, and weather: The hour is rounded down if it is in the first half and rounded up if it is in the second half of the hour.

### Current Weather component:
Component for weekly weather overview: Presents the minimum and maximum temperatures for each of the 7 days of the week, specifying today in correspondence to the current date.
Component for displaying an hourly temperature-responsive chart for the week (168 data points).

### Data Management in the App
The data consumption involves an initial data fetch based on the user's latitude and longitude to retrieve relevant weather information. If the user denies location permission, default values are used.
Upon receiving a response from the server, the user's session storage and local storage are updated to reflect the latest data.
The data in session storage is the mainly consumed for component rendering.
In offline scenarios or server outage or unresponsiveness, the application falls back on local storage as a backup of the most recent successful server response.
The goal is to minimize server requests, enhance the app's speed and responsiveness, given the relatively small size of the data payload.

## Dependencies/Third-Party Libraries
In the selection of third-party libraries, official React libraries were prioritized.

- axios: HTTP client for making asynchronous requests. Chosen for its simplicity, ease of use, and promise-based API.
- chart.js: JavaScript library for charts. Chosen for community support and easy creation of interactive and visually appealing charts.
- chartjs-adapter-moment: Chart.js Adapter for Moment.js. Chosen to support Chart.js when dealing with time-related data.
- weather-icons-react: Library for easy addition of customizable weather icons as React components, enhancing the visual representation of weather conditions.

## Instructions on Running the Code and Tests

1. Cloning the Git Repositories of the App

HTTP: `git clone https://github.com/mufidaA/weather-app.git`

SSH: `git clone git@github.com:mufidaA/weather-app.git`

GitHub CLI:`gh repo clone mufidaA/weather-app`

2. Installing Dependencies
In the app root, run to install dependencies.

npm
`cd weather-app`

`Weather-app~ npm install`

yarn
`cd weather-app`

`Weather-app~ yarn`

3. Compiling the App Source Code

Dev mode:
npm
`Weather-app~ npm run dev`

yarn
`Weather-app~ yarn dev`

Preview mode:

npm
`Weather-app~ npm run build`
`Weather-app~ npm run preview`

yarn
`Weather-app~ yarn build`
`Weather-app~ yarn preview`

4. Running the Tests

npm `Weather-app~ npm run test`

yarn `Weather-app~ yarn test`

## Known Issues and Potential Plans
Console does not display issues, and the app behaves as expected.
The context provider can be improved for better modularity. It still feels somewhat 'magical' at times, in terms of how predictable the behavior of hooks is and how much control there is over useState and useEffect. A deeper understanding of hooks could lead to better code production.
The responsiveness of the layout is somewhat limited/reduced.
More work is needed on the visual representation of weather conditions and time of the day via icons. Currently, the app uses 2 icons, and temperature conditioning is hardcoded.
