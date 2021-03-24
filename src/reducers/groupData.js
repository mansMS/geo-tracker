const initialState = {
  name: null,
  id: null,
  error: null,
};

const groupData = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return {
        ...state,
        id: action.payload,
        error: null,
      };
    case 'SET_GROUP_ERROR':
      return {
        ...state,
        id: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default groupData;
