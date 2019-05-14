import { combineReducers } from 'redux';
import announcementsReducer from './Announcements';
import configurationReducer from './Configuration';
import eventsReducer from './Events';
import locationsReducer from './Locations';
import authReducer from './Auth';

export default combineReducers({
    announcements: announcementsReducer,
    configuration: configurationReducer,
    events: eventsReducer,
    locations: locationsReducer,
    auth: authReducer,
});