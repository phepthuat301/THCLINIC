import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import servicesReducer from './services.reducer';
import statisticReducer from './statistic.reducer';
export default combineReducers({
  userReducer: userReducer,
  servicesReducer: servicesReducer,
  statisticReducer: statisticReducer
})
