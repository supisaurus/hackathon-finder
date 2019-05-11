import AsyncStorage from '@react-native-community/async-storage';

export async function _getRegistrations() {
  const value = await AsyncStorage.getItem('registrations');
  let registrations = JSON.parse(value);
  if (!registrations){
    return {};
  }
  else {
    return registrations;
  }
};

export function _isRegistered(id, registrations) {
  if (registrations.hasOwnProperty(id.toString())) {
    return true;
  } else {
    return false;
  }
};
