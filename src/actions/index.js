const geoDataRequested = () => {
  return {
    type: 'FETCH_GEO_DATA_REQUEST',
  };
};

const geoDataLoaded = (geoData) => {
  return {
    type: 'FETCH_GEO_DATA_SUCCESS',
    payload: geoData,
  };
};

const geoDataError = (error) => {
  return {
    type: 'FETCH_GEO_DATA_FAILURE',
    payload: error,
  };
};

const setGroupDataId = (id) => {
  return {
    type: 'SET_GROUP_ID',
    payload: id,
  };
};

const setGroupDataError = (error) => {
  return {
    type: 'SET_GROUP_ERROR',
    payload: error,
  };
};

const setUserDataId = (id) => {
  return {
    type: 'SET_USER_ID',
    payload: id,
  };
};

const setUserDataError = (error) => {
  return {
    type: 'SET_USER_ERROR',
    payload: error,
  };
};

export {
  geoDataRequested,
  geoDataLoaded,
  geoDataError,
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
};
