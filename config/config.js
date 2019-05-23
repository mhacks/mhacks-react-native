import { Constants } from 'expo';
const { manifest } = Constants;

export default {

    // Version of the API to put in the URL of API requests
    API_VERSION: 'v1',

    // Whether to use local copy of backend on dev builds.
    // If true, the app will attempt to connect to
    // http://<ip_of_computer_running_expo>:3000.
    USE_LOCAL_BACKEND_ON_DEV_BUILD: true,

    // Gets the base URL to use for API requests according to
    // USE_LOCAL_BACKEND_ON_DEV_BUILD and __DEV__. If production
    // build, this will always return the live server's URL.
    get BASE_URL() {
        return this.USE_LOCAL_BACKEND_ON_DEV_BUILD && __DEV__ ?
            'http://' + manifest.debuggerHost.split(`:`).shift() + ':3000/' + this.API_VERSION :
            'https://mhacks.org/' + this.API_VERSION
    },

    // The width of the map
    MAP_DELTA: 0.005,

    // Size of the icons on the tab bar
    TAB_NAVIGATOR_ICON_SIZE: 20,

    // Window of time (in hours) around the start and end 
    // of hacking where announcements can be sent
    ANNOUNCEMENT_TIME_WINDOW_PADDING: 10,

    // A list of colors for the app. It would be nice
    // to be able to dynamically fill the list of colors,
    // but I guess we have to define them at compile
    // time to assign them colors.
    COLORS: {

        // Used for the color of the tab bar focus tint
        TAB_BAR_ICON: '#E02358',

        // Colors relating to the ticket component
        TICKET: {
            BACKGROUND: '#E02358',
            QR_CODE: '#E02358',
        },

        // Colors used for each category event
        EVENT_BY_CATEGORY: {
            'general': '#00CFC1',
            'sponsor event': '#F7EE7F',
            'tech talk': '#A54657',
            'food': '#FD5200',
            'other': '#F78764',
        },

        // Colors used for each category announcement
        ANNOUNCEMENT_BY_CATEGORY: {
            'logistics': '#00CFC1',
            'event': '#A54657',
            'food': '#FD5200',
            'emergency': '#FF0000',
        }

    },

};