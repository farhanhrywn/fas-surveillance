import { createStore, applyMiddleware, compose } from "redux";
import { api } from '../config/axios'
import thunk from "redux-thunk";
import Swal from 'sweetalert2';


const initialState = {
  assetsBackload: [],
  assetsRequest: [],
  assetsRequestSpv: [],
  filteredReqSpv: [],
  assets: [],
  filteredAssets: [],
  assetDetail: {},
  assetsSpv: [],
  filteredAssetsSpv: [],
  locations: [],
  assetsBackloadSpv: [],
  countNotSeenRequest: 0,
  error: null,
  loading: true
}

export const getAssetsBackloadByLocationId = (locationId) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/getBackload/${locationId}`,
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
    .finally(() => {
      dispatch({
        type: 'SET_LOADING',
        payload: false
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
      url: `/Surveillance/handover/${item.id_surv}`,
      method: 'POST',
      data: item
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses menambahkan handover',
        timer: 2000,
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

export const saveEditAsset = (item, router) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/update/${item.id_surv}`,
      method: 'POST',
      data: item
    })
    .then(({ data }) => {
      Swal.fire({
        icon: 'success',
        title: 'Sukses edit asset',
        timer: 2000,
        showConfirmButton: false
      })
      dispatch({
        type: 'SET_EDIT_HANDOVER',
        payload: item
      })
      router.push('/home')
    })
    .catch((err) => {
      console.log(err)
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

export const getDetailAsset = (id) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/detail/${id}`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ASSET_DETAIL',
        payload: data[0]
      })
    })
    .catch((err) => {
      dispatch({
        type: 'SET_ERROR_MSG',
        payload: err
      })
    })
    .finally(() => {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    })
  }
}

export const filterAssetByParams = (loc_id, params) => {
  return (dispatch) => {
      api({
        url: `/Surveillance/viewItembyFilter/${loc_id}/${params.item_name}/${params.type}/${params.status}/${params.start_date}/${params.end_date}`,
        method: 'GET'
      })
      .then(({ data }) => {
        dispatch({
          type: 'SET_FILTERED_ASSETS',
          payload: data
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SET_ERROR_MSG',
          payload: err
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
      })
  }
}

export const filterAssetSpvByParams = (params) => {
  return (dispatch) => {
      api({
        url: `/Surveillance/viewItembyFilter/${params.id_lokasi}/${params.item_name}/${params.type}/${params.status}/${params.start_date}/${params.end_date}`,
        method: 'GET'
      })
      .then(({ data }) => {
        dispatch({
          type: 'SET_FILTERED_ASSETS_SPV',
          payload: data
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SET_ERROR_MSG',
          payload: err
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
      })
  }
}

export const fetchDataAssetSpv = (locationId) => {
  return (dispatch) => {
    api({
      url: `/Surveillance/viewItembyFilter/null/null/null/null/null/null`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_ASSETS_SPV',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'SET_ERROR_MSG',
        payload: err
      })
    })
    .finally(() => {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    })
  }
}

export const fetchDataLocations = () => {
  return (dispatch) => {
    api({
      url: '/Location',
      method: 'GET'
    })
    .then (({ data }) => {
      dispatch({
        type: 'SET_LOCATIONS',
        payload: data
      })
    })
    .catch((err) => {
      dispatch({
        type: 'SET_ERROR_MSG',
        payload: err
      })
    })
    .finally(() => {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    })
  }
}

export const getRequestSpv = () => {
  return (dispatch) => {
    api({
      url: `/Request/viewRequestbyFilter/null/null/null/null`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_REQUEST_SPV',
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

export const filterRequestSpvByParams = (params) => {
  return (dispatch) => {
      api({
        url: `/Request/viewRequestbyFilter/${params.id_lokasi}/${params.seen_status}/${params.start_date}/${params.end_date}`,
        method: 'GET'
      })
      .then(({ data }) => {
        dispatch({
          type: 'SET_FILTERED_REQUEST_SPV',
          payload: data
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SET_ERROR_MSG',
          payload: err
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
      })
  }
}

export const getBackloadSpv = () => {
  return (dispatch) => {
    api({
      url: `/Surveillance/itemBackloadByMonth/null/null/null`,
      method: 'GET'
    })
    .then(({ data }) => {
      dispatch({
        type: 'SET_BACKLOAD_SPV',
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

export const filterBackloadSpvByParams = (params) => {
  return (dispatch) => {
      api({
        url: `/Surveillance/itemBackloadByMonth/${params.id_lokasi}/${params.month}/${params.plan_status}`,
        method: 'GET'
      })
      .then(({ data }) => {
        dispatch({
          type: 'SET_FILTERED_BACKLOAD_SPV',
          payload: data
        })
      })
      .catch((err) => {
        dispatch({
          type: 'SET_ERROR_MSG',
          payload: err
        })
      })
      .finally(() => {
        dispatch({
          type: 'SET_LOADING',
          payload: false
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
    case 'SET_REQUEST_SPV':
      let notSeenRequest = action.payload.filter((request) => request.seen_status === 'not seen')
      return { ...state, filteredReqSpv: action.payload, assetsRequestSpv: action.payload, countNotSeenRequest: notSeenRequest.length  }
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
    case 'SET_ASSETS_SPV':
      return { ...state, assetsSpv: action.payload, filteredAssetsSpv: action.payload }
    case 'SET_FILTERED_ASSETS_SPV':
      return { ...state, filteredAssetsSpv: action.payload }
    case 'SET_FILTERED_REQUEST_SPV':
      return { ...state, filteredReqSpv: action.payload }
    case 'SET_FILTERED_BACKLOAD_SPV':
      return { ...state, assetsBackloadSpv: action.payload }
    case 'SET_LOCATIONS':
      return { ...state, locations: action.payload }
    case 'SET_BACKLOAD_SPV':
      return { ...state, assetsBackloadSpv: action.payload }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store