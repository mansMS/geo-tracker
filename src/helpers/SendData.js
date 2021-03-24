import { database } from '../services/firebase';
import { setGroupDataId, setUserDataId } from '../actions';

export const geoSender = (groupId, userId) => {
  const geoGetterOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const sendInterval = 10000;

  const sendGeoData = ({ timestamp, coords }) => {
    database
      .ref(groupId + '/geo/' + userId + '/' + timestamp)
      .set(coords, (error) => {
        if (error) {
          console.log('Геоданные не записаны, ', error);
        }
      });
  };

  const geoSuccess = (position) => {
    if (groupId && userId) {
      const {
        timestamp,
        coords: { latitude, longitude },
      } = position;

      sendGeoData({
        timestamp,
        coords: { latitude, longitude },
      });
    } else {
      clearInterval(timerId);
    }
  };

  const geoError = (error) => {
    console.log('geo position watcher error: ', error);
  };

  let timerId = setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      geoSuccess,
      geoError,
      geoGetterOptions
    );
  }, sendInterval);
};

export const createGroup = (groupId) => (dispatch) => {
  database.ref(groupId).set({ geo: { data: '' } }, (error) => {
    if (error) {
      console.log('Группа не создана, ', error);
    } else {
      dispatch(setGroupDataId(groupId));
    }
  });
};

export const createUser = (groupId, userId) => (dispatch) => {
  database
    .ref(groupId + '/geo/' + userId + '/0000000000000')
    .set({ latitude: 0, longitude: 0 }, (error) => {
      if (error) {
        console.log('Пользователь не создан, ', error);
      } else {
        dispatch(setUserDataId(userId));
      }
    });
};
