const initialState = {
  hiddenUsers: [],
};

const settingData = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HIDDEN_USER':
      return {
        ...state,
        hiddenUsers: [...state.hiddenUsers, action.payload],
      };
    case 'EXCLUDE_HIDDEN_USER':
      const index = state.hiddenUsers.findIndex(
        (userId) => userId === action.payload
      );
      return {
        ...state,
        hiddenUsers: [
          ...state.hiddenUsers.slice(0, index),
          ...state.hiddenUsers.slice(index + 1),
        ],
      };
    case 'CLEAR_HIDDEN_LIST':
      return {
        ...state,
        hiddenUsers: [],
      };
    default:
      return state;
  }
};

export default settingData;
