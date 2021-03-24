const initialState = {
  id: null,
  name: null,
  login: null,
  error: null,
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        id: action.payload,
        error: null,
      };
    case 'SET_USER_ERROR':
      return {
        ...state,
        id: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userData;
