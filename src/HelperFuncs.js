import AsyncStorage from '@react-native-community/async-storage';
import { hackathons } from './Data';
import moment from 'moment';

export async function _isHost() {
  let value = await AsyncStorage.getItem('isHost');
  let isHost = JSON.parse(value);
  if (isHost) {
    return true;
  }
  else {
    return false;
  }
};

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

export async function _search(searchfilter, categoryfilter) {
  let result = [];
  let registrations = await _getRegistrations();
  for (var hackathon_i in hackathons) {
    let hackathon = hackathons[hackathon_i];
    let fitsCategory = _fitsCategoryFilter(categoryfilter, hackathon, registrations);
    let fitsSearch = _fitsSearchFilter(searchfilter, hackathon);
    if (fitsCategory && fitsSearch) {
      result.push(hackathon);
    }
  }
  return result;
};

function _fitsCategoryFilter(categoryfilter, hackathon, registrations) {
  if (categoryfilter) {
    if (categoryfilter == 'all') {
      return true;
    }
    else if (categoryfilter == 'upcoming') {
      if (moment().isBefore(hackathon.whenfrom)) {
        return true;
      }
    }
    else if (categoryfilter == 'ongoing') {
      if (moment().isAfter(hackathon.whenfrom) && moment().isBefore(hackathon.whento)) {
        return true;
      }
    }
    else if (categoryfilter == 'past') {
      if (moment().isAfter(hackathon.whento)) {
        return true;
      }
    }
    else if (categoryfilter == 'registered') {
      if (_isRegistered(hackathon.id, registrations)) {
        return true;
      }
    }
  }
  return false;
};

function _fitsSearchFilter(searchfilter, hackathon) {
  if (searchfilter) {
    if (hackathon.name.toLowerCase().indexOf(searchfilter.toLowerCase()) !== -1) {
      return true;
    }
  }
  else if (!searchfilter || 0 === searchfilter.length) {
    return true;
  }
  return false;
};
