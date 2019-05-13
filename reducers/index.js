import { combineReducers } from 'redux';
import announcementsReducer from './Announcements';
import configurationReducer from './Configuration';
import eventsReducer from './Events';
import locationsReducer from './Locations';

export default combineReducers({
    announcements: announcementsReducer,
    configuration: configurationReducer,
    events: eventsReducer,
    locations: locationsReducer,
});