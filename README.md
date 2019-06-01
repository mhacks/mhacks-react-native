# MHacks React-Native

## Running the app

Make sure that you have `npm` installed in your environment, and install the Expo client with `npm install -g expo-cli`. Additionally, run an `npm install` to install the rest of the node modules. Next, you should be able to simply `npm start` in the project directory, wait for the dev console to open in your web browser, scan the QR code with your phone (with the Expo app), and use the app.

## Configuration
`config/config.js` contains a number of configuration values, the most important of which to setting up your environment is `USE_LOCAL_BACKEND`. If this is set to true, the app will attempt to connect to an `mhacks-web` backend running on the same IP as Expo; if false, it will hit the live MHacks API. When just testing how the app receives information consider setting this to `false`, however when experimenting with changing values this should probably stay on `true` to stay safe.

Additionally, developer builds seem to run very badly on Android, so when developing on Android it's best to keep the Expo build on production mode.