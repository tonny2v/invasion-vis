import { combineReducers } from 'redux';

const illegalState = {
  roadInfo: null,
  aIsCollapse: true,
  bIsCollapse: true,
  count: null,
  Data: null,
  Data2: null,
  ArcData: null
};
const initialState = (state = illegalState, action) => {
  const { type, payload } = action;

  if (type === 'RESET_STATE') {
    return Object.assign({}, state, payload);
  } else if (type === 'INITIAL_STATE') {
    return illegalState;
  }

  return state;
};

const subjAppState = {
  aIsCollapse: true,
  TUIIsCollapse: true,
  viewport: {
    longitude: 114.1,
    latitude: 22.5,
    zoom: 10.8,
    minZoom: 5,
    pitch: 0,
    bearing: 0,
    width: 500,
    height: 500
  },
  data: null,
  initdata: null,
  dataWithIllegal: null,
  polData: null,
  TUIData: null,
  map: null,
  isSwitchOpen: false,
  subject: 'passPort',
  initUnitData: null,
  keyVehicleIllegalData: null,
  carTypeChartData: null,
  illegalTypeChartData: null,
  unitTitle: null,
};
const subjAppModel = (state = subjAppState, action) => {
  const { type, payload } = action;

  if (type === 'RESET_STATE') {
    return Object.assign({}, state, payload);
  } else if (type === 'INITIAL_STATE') {
    return subjAppState;
  }

  return state;
};

const rootReducer = combineReducers({
  initialState,
  subjAppModel
});

export default rootReducer;
