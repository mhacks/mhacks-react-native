# MHacks React-Native

## Running the app

Make sure that you have `npm` installed in your environment, and install the Expo client with `npm install -g expo-cli`. Next, you should be able to simply `npm start` in the project directory, wait for the dev console to open in your web browser, scan the QR code with your phone (with the Expo app), and use the app.

## Configuration
`config/config.js` contains a number of configuration values, the most important of which to setting up your environment is `USE_LOCAL_BACKEND_ON_DEV_BUILD`. If this is set to true, when in a dev build (configure in the Expo dev console) the app will attempt to connect to an `mhacks-web` backend running on the same IP as Expo; if false, it will hit the live MHacks API (it will always hit the live API in a production build). When just testing how the app receives information consider setting this to `false`, however when experimenting with changing values this should probably stay on `true` to stay safe.