const initialState = {
  loading: null,
  error: null,
  data: null,
};

const geoData = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GEO_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_GEO_DATA_SUCCESS':
      return {
        ...state,
        loading: null,
        error: null,
        data: action.payload,
      };
    case 'FETCH_GEO_DATA_FAILURE':
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

export default geoData;
