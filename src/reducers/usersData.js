const initialState = {
  loading: null,
  error: null,
  data: null,
};

const usersData = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USERS_DATA_SUCCESS':
      return {
        ...state,
        loading: null,
        error: null,
        data: action.payload,
      };
    case 'FETCH_USERS_DATA_FAILURE':
      return {
        ...state,
        data: null,
        loading: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default usersData;
