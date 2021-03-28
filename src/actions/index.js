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

const usersDataRequested = () => {
  return {
    type: 'FETCH_USERS_DATA_REQUEST',
  };
};

const usersDataLoaded = (usersData) => {
  return {
    type: 'FETCH_USERS_DATA_SUCCESS',
    payload: usersData,
  };
};

const usersDataError = (error) => {
  return {
    type: 'FETCH_USERS_DATA_FAILURE',
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

const addHiddenUser = (id) => {
  return {
    type: 'ADD_HIDDEN_USER',
    payload: id,
  };
};

const excludeHiddenUser = (id) => {
  return {
    type: 'EXCLUDE_HIDDEN_USER',
    payload: id,
  };
};

const clearHiddenList = () => {
  return {
    type: 'CLEAR_HIDDEN_LIST',
  };
};

export {
  geoDataRequested,
  geoDataLoaded,
  geoDataError,
  usersDataRequested,
  usersDataLoaded,
  usersDataError,
  setGroupDataId,
  setGroupDataError,
  setUserDataId,
  setUserDataError,
  addHiddenUser,
  excludeHiddenUser,
  clearHiddenList,
};
