# CHEMOTRIX DASHBOARD

## This application is created with reactjs and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
If you are not familiar with react, head on to [React](https://reactjs.org) for an indepth tutorial on react

## Getting started
- Clone this branch using either HTTPS or Github CLI
- When done, navigate to the folder of the application and run the command

### `npm install` 

The above code installs all dependencies necessary to run the app.

### `npm run start`

The above code runs the application in development mode

## The Soul of this app is the CO2 api which is populated by the Carbon sensor
Link to the [api](https://api.thingspeak.com/channels/1485319/feeds.json)

## Charting with React
We used chart.js react wrapper library to display the api. This is because Chart.js is easy to get started with and there are not much configurations to intiate
Link to [chartjs](https://github.com/reactchartjs/react-chartjs-2#readme) to read more about chart.js

Charting with chart.js using data called from an api requires that the data is arranged in such a way that chart.js can understand. The implication of this is that the data gotten must be manipulated to fit the format: `{
}`


