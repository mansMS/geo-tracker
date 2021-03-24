import { combineReducers } from 'redux';
import groupData from './groupData';
import userData from './userData';
import geoData from './geoData';
import settingData from './settingData';

export default combineReducers({ groupData, userData, geoData, settingData });
