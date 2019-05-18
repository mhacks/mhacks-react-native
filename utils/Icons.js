import { Platform } from 'react-native';

// Gets the name of the icon for the specific platform.
// If iOS, returns ios-name, else md-name.
export function getPlatformSpecificIconName(name) {
    return (Platform.OS === 'ios' ? 'ios' : 'md') + '-' + name;
}