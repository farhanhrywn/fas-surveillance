import { createStore, applyMiddleware, compose } from "redux";
import { api } from '../config/axios'
import thunk from "redux-thunk";
import Swal from 'sweetalert2'


const initialState = {
  assetsBackload: [],
  assetsRequest: [],
  assets: [],
  filteredAssets: [],
  assetDetail: {},
  error: null,
  loading: true
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
      url: `/Request/${locationId}/all`,
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

export const fetchDataAsset = (locationId) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/${locationId}`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ASSETS',
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

export const filterAssetByType = (type, assetList) => {
  return (dispatch) => {
    if(type === '') {
      dispatch({
        type: 'SET_FILTERED_ASSETS',
        payload: assetList
      })
    } else {
      let data = assetList.filter((asset) => asset.type === type)

      dispatch({
        type: 'SET_FILTERED_ASSETS',
        payload: data
      })
    }
  }
}

export const saveHandoverAsset = (item, locationId) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/handover/${locationId}`,
      method: 'POST',
      data: JSON.stringify(item)
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan handover',
        timer: 4500,
        showConfirmButton: false
      })
      dispatch({
        type: 'SET_EDIT_HANDOVER',
        payload: item
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

export const saveEditAsset = (item) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/update/${item.id_surv}`,
      method: 'POST',
      data: JSON.stringify(item)
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses edit asset',
        timer: 5000,
        showConfirmButton: false
      })
      dispatch({
        type: 'SET_EDIT_HANDOVER',
        payload: item
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

export const deleteAsset = (assetId) => {
  return ( dispatch ) => {
    api({
      url: `/Surveillance/${assetId}`,
      method: 'DELETE'
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses remove item', 
        timer: 3000,
        showConfirmButton: false
      })
      dispatch({
        type: 'SET_DELETE_UNIT',
        payload: assetId
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
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ASSETS_BACKLOAD':
      return { ...state, assetsBackload: action.payload }
    case 'SET_ASSETS_REQUEST':
      return { ...state, assetsRequest: action.payload }
    case 'SET_ASSETS':
      return { ...state, assets: action.payload, filteredAssets: action.payload }
    case 'SET_FILTERED_ASSETS':
      return { ...state, filteredAssets: action.payload }
    case 'SET_EDIT_HANDOVER':
      let assetList = state.assets
      for ( const asset in assetList ) {
        if( assetList[asset].id_surv === action.payload.id_surv ) {
          assetList[asset] = action.payload
          break;
        }
      }

      return { ...state, assets: assetList, filteredAssets: assetList}
    case 'SET_ASSET_DETAIL':
      return { ...state, assetDetail: action.payload }
    case 'SET_DELETE_UNIT':
      let newAssetList = state.assets.filter((asset) => asset.id_surv !== action.payload)
      return { ...state, assets: newAssetList, filteredAssets: newAssetList }
    case 'SET_ERROR_MSG':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store