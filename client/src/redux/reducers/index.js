import { combineReducers } from 'redux';
import adminReducer from './admin.reducer';
import servicesReducer from './services.reducer';
import statisticReducer from './statistic.reducer';
import accountReducer from './account.reducer'
export default combineReducers({
  adminReducer: adminReducer,
  servicesReducer: servicesReducer,
  statisticReducer: statisticReducer,
  accountReducer: accountReducer,
})
