import Constants from 'expo-constants';
const { manifest } = Constants;

export default {

    // Version of the API to put in the URL of API requests
    API_VERSION: 'v1',

    // Whether to use local copy of backend on dev builds.
    // If true, the app will attempt to connect to
    // http://<ip_of_computer_running_expo>:3000.
    USE_LOCAL_BACKEND: true,

    // Gets the base URL to use for API requests according to
    // USE_LOCAL_BACKEND.
    get BASE_URL() {
        return this.USE_LOCAL_BACKEND ?
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

    // How long after QR scan to wait (in ms) before reactivating
    // scanner. Also affects length of border animation
    QR_SCANNER_REACTIVATE_DELAY: 2000,

    // Whether events that have already happened should appear
    // disabled (according to COLORS.EVENT_DISABLED). Disabling
    // this is useful for testing colors
    DISABLE_PAST_EVENTS: true,

    // A list of colors for the app. It would be nice
    // to be able to dynamically fill the list of colors,
    // but I guess we have to define them at compile
    // time to assign them colors.
    COLORS: {

        // Used for the color of the tab bar focus tint
        TAB_BAR_ICON: '#0C053E',

        // Color used to signify when an event is disabled
        // (used for dot, line, and text)
        EVENT_DISABLED: '#ccc',

        // Colors relating to the ticket component
        TICKET: {
            BACKGROUND: '#0C053E',
            QR_CODE: '#0C053E',
        },

        // Colors used for each category event
        EVENT_CATEGORY: {
            'general': '#75CCE4',
            'tech talk': '#5971B8',
            'food': '#F05C43',
            'sponsor event': '#CDDF2F',
            'other': '#F69B71',
        },

        // Colors used for each category announcement
        ANNOUNCEMENT_CATEGORY: {
            'emergency': '#FF0000',
            'logistics': '#75CCE4',
            'food': '#F05C43',
            'event': '#5971B8',
            'sponsored': '#CDDF2F',
        }

    },

    // textTransform capitalize doesn't work on Android,
    // and we might want more freedom in the future.
    DISPLAY_NAMES: {

        EVENT_CATEGORY: {
            'general': 'General',
            'tech talk': 'Tech Talk',
            'food': 'Food',
            'sponsor event': 'Sponsor Event',
            'other': 'Other',
        },

        ANNOUNCEMENT_CATEGORY: {
            'emergency': 'Emergency',
            'logistics': 'Logistics',
            'food': 'Food',
            'event': 'Events',
            'sponsored': 'Sponsored',
        },

    },

};