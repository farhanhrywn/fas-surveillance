import { createStore, applyMiddleware, compose } from "redux";
import { api } from '../config/axios'
import thunk from "redux-thunk";

const initialState = {
  assetsBackload: [],
  assetsRequest: [],
  error: null
}

export const getAssetsBackloadByLocationId = (locationId) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/getBackload/${locationId}`,
      // url: '/asset',
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ASSETS_BACKLOAD',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'SET_ERROR_MSG',
        payload: err
      })
    })
  }
}

export const getAssetRequest = (locationId) => {
  return (dispatch) => {
    api({
      url: `Request/${locationId}/all`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ASSETS_REQUEST',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'SET_ERROR_MSG',
        payload: err
      })
    })
  }
}

const reducer = (state = initialState, action) => {
  switch ( action.type ) {
    case 'SET_ASSETS_BACKLOAD':
      return { ...state, assetsBackload: action.payload }
    case 'SET_ASSETS_REQUEST':
      return { ...state, assetsRequest: action.payload }
    case 'SET_ERROR_MSG':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store