import { database } from '../services/firebase';
import { geoDataRequested, geoDataLoaded, geoDataError } from '../actions';

export const geoReceiver = (groupId) => (dispatch) => {
  if (groupId) {
    dispatch(geoDataRequested());
    database.ref(groupId + '/geo').on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(geoDataLoaded(snapshot.val()));
      } else {
        dispatch(geoDataError('Геоданные недоступны'));
      }
    });
  } else {
    database.ref(groupId + '/geo').off();
    dispatch(geoDataLoaded(null));
  }
};

export const checkDataExistence = async (path) => {
  try {
    const snapshot = await database.ref(path).once('value');
    return snapshot.exists();
  } catch (error) {
    console.log(error);
    return false;
  }
};
